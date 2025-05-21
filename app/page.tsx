import React from "react";
import AuthorizedLayout from "@/components/authorized-layout";
import AboutUs from "@/components/about-me";
import Footer from "@/components/footer";
import HeaderNavBar from "@/components/header";
import Books from "@/components/books";
import Projects from "@/components/projects";
export default function AboutMe(){
    return (        
        <AuthorizedLayout>
            <HeaderNavBar />
            <div className="h-full w-full flex flex-col items-center justify-center md:pt-0">
                <div className="flex flex-col items-center justify-center pt-16 w-full">
                    <AboutUs />
                </div>
                <div id="read">
                    <Books/>
                </div>
            </div>
            <Footer />
        </AuthorizedLayout>
    )
}; 