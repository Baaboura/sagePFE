export default function LoadingPage() {
    return (
        <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
            <img src="/assets/img/logo1.png" alt="" className="w-56" />
            <h2 className="text-sm text-gray-500 uppercase font-bold">Loading, please wait...</h2>
        </div>
    )
}