type BtnProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'children'> & {
    children:String,
    variant:'light'|'dark'
}

export default function Button({children,variant,...rest}:BtnProps){
    return <button {...rest} className={`w-28 h-12 font-semibold rounded-md text-xl m-2 ${variant=='dark'? 'bg-[#6f66ef] text-[#eae7fa]' : 'border-[#d4d2ff] border-2 border-solid text-[#6f66ef]'}`}  >
        {children}
    </button>
}