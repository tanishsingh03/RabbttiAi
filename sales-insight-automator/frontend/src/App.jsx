import { useState, useRef } from 'react'

const MOCK_DELAY = 2000 // ms to simulate network request

export default function App() {
    const [email, setEmail] = useState('')
    const [file, setFile] = useState(null)
    const [state, setState] = useState('idle') // idle | loading | success | error
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const f = e.target.files[0]
        if (f) setFile(f)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!file || !email) return

        setState('loading')

        // ─── Mock submission (frontend-only simulation) ───────────────────────────
        // NOTE: This prototype does NOT call the backend API.
        // In production, replace this with:
        //   const formData = new FormData()
        //   formData.append('file', file)
        //   formData.append('email', email)
        //   const res = await fetch('/analyze', { method: 'POST', body: formData })
        // ─────────────────────────────────────────────────────────────────────────
        setTimeout(() => {
            setState('success')
        }, MOCK_DELAY)
    }

    const reset = () => {
        setEmail('')
        setFile(null)
        setState('idle')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const stepState = (n) => {
        if (state === 'success') return 'done'
        if (state === 'loading') return n <= 2 ? 'done' : n === 3 ? 'active' : ''
        if (file && email) return n <= 2 ? 'done' : n === 3 ? 'active' : ''
        if (file) return n === 1 ? 'done' : n === 2 ? 'active' : ''
        return n === 1 ? 'active' : ''
    }

    return (
        <div className="app">
            {/* Header */}
            <div className="badge">
                <span className="badge-dot" />
                AI-Powered Analytics
            </div>

            <h1>Sales Insight<br />Automator</h1>
            <p className="subtitle">
                Upload your sales data and receive an AI-generated insight report delivered
                directly to your inbox.
            </p>

            {/* Card */}
            <div className="card">
                {/* Progress steps */}
                <div className="steps">
                    <div className={`step ${stepState(1)}`}>
                        <div className="step-num">{stepState(1) === 'done' ? '✓' : '1'}</div>
                        <span className="step-label">Upload File</span>
                    </div>
                    <div className="step-connector" />
                    <div className={`step ${stepState(2)}`}>
                        <div className="step-num">{stepState(2) === 'done' ? '✓' : '2'}</div>
                        <span className="step-label">Add Email</span>
                    </div>
                    <div className="step-connector" />
                    <div className={`step ${stepState(3)}`}>
                        <div className="step-num">{stepState(3) === 'done' ? '✓' : '3'}</div>
                        <span className="step-label">Analyse</span>
                    </div>
                </div>

                {/* Status messages */}
                {state === 'success' && (
                    <div className="status success">
                        <span className="status-icon">✅</span>
                        <div>
                            <strong>Report Queued!</strong>
                            Your file <em>{file?.name}</em> is being analysed. The AI-generated
                            report will be sent to <strong>{email}</strong> shortly.
                            <br />
                            <button className="link-btn" onClick={reset}>Submit another file</button>
                        </div>
                    </div>
                )}

                {state === 'error' && (
                    <div className="status error">
                        <span className="status-icon">❌</span>
                        <div>
                            <strong>Submission Failed</strong>
                            Something went wrong. Please try again.
                            <br />
                            <button className="link-btn" onClick={reset}>Try again</button>
                        </div>
                    </div>
                )}

                {/* Form (hidden once success) */}
                {state !== 'success' && (
                    <form className="form" onSubmit={handleSubmit}>
                        {/* File upload */}
                        <div className="field">
                            <label htmlFor="file-input">Sales Data File</label>
                            <input
                                id="file-input"
                                ref={fileInputRef}
                                type="file"
                                accept=".csv,.xlsx"
                                onChange={handleFileChange}
                                disabled={state === 'loading'}
                            />
                            <label htmlFor="file-input" className="file-label">
                                <span className="file-icon">📂</span>
                                <span className={`file-text ${file ? 'selected' : ''}`}>
                                    {file ? file.name : 'Choose a .csv or .xlsx file…'}
                                </span>
                            </label>
                            <span className="file-hint">Supported formats: .csv, .xlsx · Max size: 10 MB</span>
                        </div>

                        {/* Email input */}
                        <div className="field">
                            <label htmlFor="email-input">Report Recipient Email</label>
                            <div className="input-wrap">
                                <span className="input-icon">✉️</span>
                                <input
                                    id="email-input"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={state === 'loading'}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn"
                            disabled={!file || !email || state === 'loading'}
                        >
                            {state === 'loading' ? (
                                <>
                                    <span className="spinner" />
                                    Analysing Data…
                                </>
                            ) : (
                                <>
                                    ⚡ Generate AI Report
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Feature strip */}
            <div className="features">
                <div className="feature"><span className="feature-icon">🔒</span> End-to-end encrypted</div>
                <div className="feature"><span className="feature-icon">🤖</span> GPT-4 powered insights</div>
                <div className="feature"><span className="feature-icon">📧</span> Email delivery</div>
                <div className="feature"><span className="feature-icon">⚡</span> Results in &lt;60 seconds</div>
            </div>
        </div>
    )
}
