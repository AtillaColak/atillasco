import React from "react";
import AuthorizedLayout from "@/components/authorized-layout";
import AboutUs from "@/components/about-me";
import Footer from "@/components/footer";
import HeaderNavBar from "@/components/header";

export default function AboutMe(){
    return (        
        <AuthorizedLayout>
            <HeaderNavBar />
            <div className="bg-black h-full w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <AboutUs />
                </div>
            </div>
            <Footer />
        </AuthorizedLayout>
    )
}; 