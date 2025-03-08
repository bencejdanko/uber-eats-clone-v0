function LegalFooter() {
    return (
        <div className="grid grid-cols-2 p-10">
            <div className="text-xl font-bold"></div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-5 justify-end">
                    <a href="/">Privacy Policy</a>
                    <a href="/">Terms</a>
                </div>
            </div>
        </div>
    );
}

export { LegalFooter };
