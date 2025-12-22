const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="flex justify-center border-t border-gray-200 bg-white p-2">
      <p className="text-black">
        &#169; {date} Manoj Shrestha. All rights reserved.{" "}
      </p>
    </footer>
  );
};

export default Footer;
