const LANGSMITH_TRACING="true"
const LANGSMITH_API_KEY="..."

const OPENAI_API_KEY = "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"

// Reduce tracing latency if you are not in a serverless environment
// export LANGCHAIN_CALLBACKS_BACKGROUND=true

export {
    LANGSMITH_TRACING,
    LANGSMITH_API_KEY,
    OPENAI_API_KEY
}