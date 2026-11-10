import AntdRegistry from "./components/AntdRegistry";
import UseConfigProvider from "./components/UseConfigProvider";

// ครอบทุกหน้าใต้ /admin (login + หลังบ้าน) — หน้าเว็บหลักไม่ได้ใช้ antd จึงไม่ต้องครอบ
function Layout({ children }) {
    return (
        <AntdRegistry>
            <UseConfigProvider>{children}</UseConfigProvider>
        </AntdRegistry>
    );
}

export default Layout;
