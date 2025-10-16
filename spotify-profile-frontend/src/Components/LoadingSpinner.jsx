const LoadingSpinner = () => {
    return (
        <div >
            <div className="spinner-border mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Contacting Spotify API</p>
            <p>Please note that the backend is hosted on the free version of Render.com. This could taked up to 50 seconds for the service to spin up.</p>
        </div>
    )
}

export default LoadingSpinner