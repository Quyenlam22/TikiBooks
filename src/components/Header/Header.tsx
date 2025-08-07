import MainHeader from "./MainHeader";
import ServiceBar from "./ServiceBar";
import TopBanner from "./TopBanner";

const Header = () => {
    return (
        <header className="">
            <TopBanner/>
            <MainHeader/>
            <ServiceBar/>
            
        </header>
    );
};

export default Header;