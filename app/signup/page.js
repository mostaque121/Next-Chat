import SvgContent from "../component/subcomponent/Content/SvgContent";
import SignUpForm from "../component/subcomponent/signup/SignupForm";
const SignUp = () => {


    return (
        <div>
            <div className="flex">
                <div className=" w-full lg:max-w-[450px]">
                    <SignUpForm />
                </div>
                <div className="flex-1  ">
                    <SvgContent src='/signup.svg' />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
