import { CommunicationPageBase } from './CommunicationPageBase'

export default function TeamCommunicationPage(): React.JSX.Element {
  return (
    <CommunicationPageBase
      kind="team"
      title="Team communication"
      description="Messages, requests and technical discussions with your simulated colleagues. Replies are assessed against professional expectations when the scenario requires it."
    />
  )
}