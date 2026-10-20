import { Component, type ErrorInfo, type ReactNode } from "react";
import { Body, Button } from "@/components/ui";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  private reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[12rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-indigo/15 bg-cream/80 px-6 py-10 text-center">
          <Body className="text-sm text-indigo/70">
            This interactive preview could not load. The rest of the site still
            works — add a valid GLB in{" "}
            <code className="text-indigo/80">public/models/</code> or refresh to
            retry.
          </Body>
          <Button size="sm" type="button" variant="secondary" onClick={this.reset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
