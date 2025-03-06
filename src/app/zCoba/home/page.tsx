import { Test_Children } from "./test_children";
import Test_FooterHome from "./test_footer";
import Test_LayoutHeaderTamplate from "./test_header";
import { Test_Tamplate } from "./test_tamplate";

export default async function Page() {
  return (
    <>
      <Test_Tamplate
        header={<Test_LayoutHeaderTamplate title="Test scroll" />}
        // footer={<Test_FooterHome />}
      >
        <Test_Children />
      </Test_Tamplate>
    </>
  );
}
