function Footer() {
  let c_date = new Date();
  return (
    <>
      <h2 className="text-center py-3 footer">
        © <b>{c_date.getFullYear()}</b> - All rights reserved{" "}
      </h2>
    </>
  );
}

export default Footer;
