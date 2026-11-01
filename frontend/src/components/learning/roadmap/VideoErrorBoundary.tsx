import { Component, type ErrorInfo, type ReactNode } from 'react'
import type { VideoProvider } from './lessonVideo'
import { videoWatchUrl, youtubeThumbnailUrl } from './lessonVideo'
import { VideoFallbackCard } from './VideoFallbackCard'

interface VideoErrorBoundaryProps {
  title: string
  provider: VideoProvider
  embedUrl: string
  children: ReactNode
}

interface VideoErrorBoundaryState {
  failed: boolean
}

/**
 * Catches render/lifecycle crashes from a provider player (third-party widget
 * failures, malformed data) and replaces the video with the same fallback card
 * used for runtime embed errors. Event-handler and async errors are handled by
 * the players' own try/catch guards.
 */
export class VideoErrorBoundary extends Component<
  VideoErrorBoundaryProps,
  VideoErrorBoundaryState
> {
  override state: VideoErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): VideoErrorBoundaryState {
    return { failed: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Video player crashed', error, info.componentStack)
  }

  override componentDidUpdate(prevProps: VideoErrorBoundaryProps): void {
    // A new video should get a clean attempt without keeping the old failure.
    if (this.state.failed && prevProps.embedUrl !== this.props.embedUrl) {
      this.setState({ failed: false })
    }
  }

  override render(): ReactNode {
    if (this.state.failed) {
      return (
        <VideoFallbackCard
          title={this.props.title}
          provider={this.props.provider}
          failure={{ reason: 'crash' }}
          watchUrl={videoWatchUrl(this.props.provider, this.props.embedUrl)}
          thumbnailUrl={youtubeThumbnailUrl(this.props.embedUrl)}
          onRetry={() => this.setState({ failed: false })}
        />
      )
    }
    return this.props.children
  }
}
