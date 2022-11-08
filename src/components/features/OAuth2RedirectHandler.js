import React from 'react'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { __kakaoLogin } from "../../redux/modules/memberSlice"
import Loading from './Loading';



const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");
    console.log("인가코드 잘 들어왔나", code);

    useEffect(async () => {
        await dispatch(__kakaoLogin(code));
    }, []);

    return <Loading />;
}

export default OAuth2RedirectHandler