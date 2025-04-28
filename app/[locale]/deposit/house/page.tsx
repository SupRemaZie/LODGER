export default function Page() {
    return (
        <div className="w-full">
            <div className="font-[500] flex flex-col  min-h-content p-14 scrollbar-hide">
                <div id="header" className="w-full flex flex-row justify-between  items-center">
                    <div className="flex flex-col">
                        <span id="page-title" className="text-[#02504D] font-">
                            Page de dépôt de maison
                        </span>
                        <span className="font-bold text-xl">
                            Choisissez le type de maison
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}