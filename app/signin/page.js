import SvgContent from "../component/subcomponent/Content/SvgContent";
import SignInForm from "../component/subcomponent/Signin/SignInForm";
export default function SignIn() {
    return (
        <div>
            <div className="flex items-center">
                <div className=" w-full lg:max-w-[450px]">
                    <SignInForm />
                </div>
                <div className="flex-1  ">
                    <SvgContent src='/signup.svg' />
                </div>
            </div>
        </div>
    );
};


