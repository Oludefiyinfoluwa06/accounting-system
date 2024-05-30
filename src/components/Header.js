const Header = ({ title, subTitle }) => {
    return (
        <div className="bg-gradient-to-r from-transparentBlack to-transparentBlack flex justify-center items-center flex-col gap-2 text-white p-[30px] text-center h-[300px] header">
            <h1 className="text-[40px] font-bold">{title}</h1>
            <p>{subTitle}</p>
        </div>
    );
}

export default Header;