function Footer() {
    let c_date = new Date();
    return (<>
        <h2 className="text-center py-3 footer" >© {c_date.getFullYear()} - All rights reserved </h2>
    </>)
}

export default Footer;