export default function Button({children, ...props}) {
    return <button id="sidebar-btn" className="md:text-base" {...props}>{children}</button>

}