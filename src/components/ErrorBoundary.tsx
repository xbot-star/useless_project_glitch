import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Jeevify Uncaught Component Error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('jeevify_active_identity');
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fcfbf7] text-[#1a1a1a] flex flex-col items-center justify-center p-6 text-center font-sans-body">
          <div className="max-w-md w-full bg-white border border-[#b8860b]/40 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold font-serif-heading text-[#0f0f0f]">
                SOMETHING GLITCHED IN THE THINGVERSE
              </h2>
              <p className="text-xs text-[#4a4a4a] leading-relaxed font-serif">
                An unexpected state error occurred while rendering your object's world. We've captured the glitch.
              </p>
              {this.state.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-left font-mono text-[11px] text-red-800 overflow-x-auto max-h-40">
                  <p className="font-bold">{this.state.error.toString()}</p>
                  {this.state.error.stack && (
                    <pre className="text-[9px] text-red-600 mt-1 whitespace-pre-wrap">{this.state.error.stack}</pre>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3.5 px-6 rounded-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#b8860b] text-[#1a1a1a] text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESET & RE-ENTER THINGVERSE</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.href = '/';
                }}
                className="w-full py-3 px-6 rounded-2xl font-semibold bg-[#f3efe6] hover:bg-[#e8e3d5] text-[#1a1a1a] text-xs flex items-center justify-center gap-2 transition-all border border-[#b8860b]/20"
              >
                <Home className="w-4 h-4" />
                <span>RETURN TO HOME PORTAL</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
