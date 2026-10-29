$ErrorActionPreference = 'Continue'
$logDir = 'C:\Users\Sama\Desktop\My Projects\carrer lab\backend\logs'
Start-Transcript -Path (Join-Path $logDir 'reset-root.log') -Force

$bin80 = 'C:\Program Files\MySQL\MySQL Server 8.0\bin'
$ini80 = 'C:\ProgramData\MySQL\MySQL Server 8.0\my.ini'
$errLog = Join-Path $logDir 'mysqld-temp.err.log'

try {
  Write-Output '[0] restoring MySQL96 service...'
  net start MySQL96 2>&1 | Out-Host

  Write-Output '[1] stopping MySQL80 (port 3308)...'
  net stop MySQL80 2>&1 | Out-Host
  Start-Sleep -Seconds 2
  Remove-Item $errLog -ErrorAction SilentlyContinue

  Write-Output '[2] temporary mysqld 8.0 with --skip-grant-tables + --named-pipe...'
  $tmp = Start-Process -FilePath (Join-Path $bin80 'mysqld.exe') `
    -ArgumentList @("--defaults-file=`"$ini80`"", '--skip-grant-tables', '--named-pipe', '--enable-named-pipe', '--console') `
    -WindowStyle Hidden -PassThru `
    -RedirectStandardOutput (Join-Path $logDir 'mysqld-temp.out.log') `
    -RedirectStandardError $errLog

  $readyLine = ''
  $up = $false
  for ($i = 0; $i -lt 90; $i++) {
    Start-Sleep -Seconds 1
    if ($tmp.HasExited) { throw "temp mysqld exited early code $($tmp.ExitCode)" }
    if (Test-Path $errLog) {
      $tail = Get-Content $errLog -Tail 3 -ErrorAction SilentlyContinue
      $hit = $tail | Where-Object { $_ -match 'ready for connections' }
      if ($hit) { $up = $true; $readyLine = $hit; break }
    }
  }
  if (-not $up) { throw 'temp mysqld never became ready within 90s' }
  Write-Output "[3] ready: $readyLine"
  Start-Sleep -Seconds 2

  Write-Output '[4] setting root@localhost password via named pipe...'
  Remove-Item Env:\MYSQL_PWD -ErrorAction SilentlyContinue
  & (Join-Path $bin80 'mysql.exe') -u root --protocol=pipe -e "FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY 'Mazen@2009'; FLUSH PRIVILEGES;" 2>&1 | Out-Host
  if ($LASTEXITCODE -ne 0) { throw "ALTER USER failed rc=$LASTEXITCODE" }

  Write-Output '[5] clean shutdown of temp instance...'
  & (Join-Path $bin80 'mysqladmin.exe') -u root --protocol=pipe shutdown 2>&1 | Out-Host
  if (-not $tmp.WaitForExit(30000)) { Stop-Process -Id $tmp.Id -Force }
  Start-Sleep -Seconds 3

  Write-Output '[6] starting MySQL80 service...'
  net start MySQL80 2>&1 | Out-Host
  Start-Sleep -Seconds 5

  Write-Output '[7] verifying credentials + creating databases...'
  $env:MYSQL_PWD = 'Mazen@2009'
  & (Join-Path $bin80 'mysql.exe') -u root -h 127.0.0.1 -P 3308 -e "SELECT VERSION(); CREATE DATABASE IF NOT EXISTS career_lab CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci; CREATE DATABASE IF NOT EXISTS career_lab_test CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci; SHOW DATABASES LIKE 'career_lab%';" 2>&1 | Out-Host
  if ($LASTEXITCODE -ne 0) { throw 'verification login failed' }

  Write-Output 'RESET_DONE'
} catch {
  Write-Output ("RESET_FAILED: " + $_.Exception.Message)
  try { net start MySQL80 2>&1 | Out-Host } catch {}
} finally {
  Remove-Item Env:\MYSQL_PWD -ErrorAction SilentlyContinue
  Stop-Transcript | Out-Null
}
