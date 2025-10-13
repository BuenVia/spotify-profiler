const LoadingSpinner = () => {
    return (
        <div >
            <div className="spinner-border mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Contacting Spotify API</p>
        </div>
    )
}

export default LoadingSpinner