import React from "react"
import { useNavigate, useParams } from "react-router-dom"

const Dock = () => {
  const params = useParams()
  const navigate = useNavigate()
  const gu = localStorage.getItem("gu")

  const toLogin = () => {
    alert("로그인이 필요한 서비스입니다🥲")
    navigate("/login")
  }

  const onInfo = () => {
    alert("확인하려는 위치가 선택되지 않았습니다. 홈화면에서 구를 선택하여 주십시오😀")
  }

  return (
    <>
      <div className="fixed bottom-0 w-full h-[80px] bg-bbLpurple">
        <hr className="border-[0.5px] border-t-0 border-bbBB w-full" />
        <div className="w-full h-[52px] bg-bbLpurple text-bb66 text-[10px] flex justify-evenly items-center">
          <div
            onClick={() => navigate("/home")}
            className="w-12 pt-2 pb-1 flex flex-col items-center cursor-pointer"
          >
            <dt>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_431_2817)">
                  <path
                    d="M15 16.3125H11.145C10.8375 16.3125 10.5825 16.0575 10.5825 15.75V12.7125C10.5675 11.91 9.8625 11.25 9 11.25C8.1375 11.25 7.4325 11.91 7.4175 12.72V15.75C7.4175 16.0575 7.1625 16.3125 6.855 16.3125H3C2.6925 16.3125 2.4375 16.0575 2.4375 15.75V7.455C2.4375 7.29 2.505 7.14 2.6325 7.0275L8.6325 1.8225C8.8425 1.6425 9.1575 1.6425 9.3675 1.8225L15.3675 7.0275C15.4875 7.1325 15.5625 7.29 15.5625 7.455V15.75C15.5625 16.0575 15.3075 16.3125 15 16.3125ZM11.7075 15.1875H14.4375V7.71L11.6325 5.28L9 3L3.5625 7.7175V15.195H6.2925V12.72C6.315 11.2875 7.53 10.1325 9 10.1325C10.47 10.1325 11.685 11.2875 11.7075 12.7125V15.195V15.1875Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_2817">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </dt>
            <dd className="mt-1">홈</dd>
          </div>
          <div
            onClick={() =>
              gu === null || undefined ?
                onInfo() :
                navigate(`/info/${gu}`)}
            className="w-12 pt-2 pb-1 flex flex-col items-center"
          >
            <dt>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_431_3007)">
                  <path
                    d="M16.5 16.3125H1.5C1.1925 16.3125 0.9375 16.0575 0.9375 15.75C0.9375 15.4425 1.1925 15.1875 1.5 15.1875H16.5C16.8075 15.1875 17.0625 15.4425 17.0625 15.75C17.0625 16.0575 16.8075 16.3125 16.5 16.3125Z"
                    fill="#222222"
                  />
                  <path
                    d="M13.785 16.3125H10.35C10.0425 16.3125 9.78748 16.0575 9.78748 15.75V2.25C9.78748 1.9425 10.0425 1.6875 10.35 1.6875H13.785C14.0925 1.6875 14.3475 1.9425 14.3475 2.25V15.75C14.3475 16.0575 14.0925 16.3125 13.785 16.3125ZM10.9125 15.1875H13.2225V2.8125H10.9125V15.1875Z"
                    fill="#222222"
                  />
                  <path
                    d="M7.64997 16.3125H4.21497C3.90747 16.3125 3.65247 16.0575 3.65247 15.75V8.25C3.65247 7.9425 3.90747 7.6875 4.21497 7.6875H7.64997C7.95747 7.6875 8.21247 7.9425 8.21247 8.25V15.75C8.21247 16.0575 7.95747 16.3125 7.64997 16.3125ZM4.77747 15.1875H7.08747V8.8125H4.77747V15.1875Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_3007">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </dt>
            <dd className="mt-1">정보</dd>
          </div>
          <div
            onClick={() =>
              localStorage.getItem("nickName")
                ? navigate(`/list/${gu}/all/new`)
                : toLogin()
            }
            className="w-12 pt-2 pb-1 flex flex-col items-center"
          >
            <dt>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_431_3077)">
                  <path
                    d="M4.27509 10.9425L4.15509 10.8825C2.77509 10.8675 1.59759 9.9525 1.27509 8.61C0.937595 7.23 1.59009 5.775 2.86509 5.0775L11.6251 0H11.7901C11.8276 0 15.5851 0.1875 16.6201 4.425C17.6476 8.64 14.4751 10.74 14.4451 10.7625L14.3101 10.8525L4.42509 10.8825L4.28259 10.95L4.27509 10.9425ZM11.8951 1.14L3.41259 6.0525C2.57259 6.5175 2.14509 7.455 2.36259 8.34C2.56509 9.18 3.30759 9.75 4.17759 9.7575H4.42509H4.43259L13.9576 9.7275C14.4601 9.3375 16.2601 7.71 15.5251 4.6875C14.7976 1.71 12.5026 1.2225 11.8951 1.14Z"
                    fill="#222222"
                  />
                  <path
                    d="M8.85006 17.9975C7.58256 17.9975 6.69006 16.8964 6.69006 15.3261V9.75751H11.0026V15.3261C11.0026 16.8964 10.1176 17.9975 8.84256 17.9975H8.85006ZM7.81506 11.1113V15.3261C7.81506 16.1473 8.19756 16.6437 8.85006 16.6437C9.50256 16.6437 9.88506 16.1473 9.88506 15.3261V11.1113H7.82256H7.81506Z"
                    fill="#222222"
                  />
                  <path
                    d="M3.99756 10.77C2.44506 10.77 1.18506 9.45 1.18506 7.8225C1.18506 6.195 2.44506 4.875 3.99756 4.875C5.55006 4.875 6.81006 6.195 6.81006 7.8225C6.81006 9.45 5.55006 10.77 3.99756 10.77ZM3.99756 6C3.06756 6 2.31006 6.8175 2.31006 7.8225C2.31006 8.8275 3.06756 9.645 3.99756 9.645C4.92756 9.645 5.68506 8.8275 5.68506 7.8225C5.68506 6.8175 4.92756 6 3.99756 6Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_3077">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </dt>
            <dd className="mt-1">커뮤니티</dd>
          </div>
          <div
            onClick={() =>
              localStorage.getItem("nickName")
                ? navigate(`/bookmark`)
                : toLogin()
            }
            className="w-12 pt-2 pb-1 flex flex-col items-center"
          >
            <dt>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_431_3097)">
                  <path
                    d="M14.25 16.3125C14.145 16.3125 14.0325 16.2825 13.9425 16.2225L9 12.975L4.0575 16.2225C3.885 16.335 3.6675 16.3425 3.48 16.245C3.3 16.1475 3.1875 15.96 3.1875 15.75V2.25C3.1875 1.9425 3.4425 1.6875 3.75 1.6875H14.25C14.5575 1.6875 14.8125 1.9425 14.8125 2.25V15.75C14.8125 15.96 14.7 16.1475 14.52 16.245C14.4375 16.29 14.3475 16.3125 14.25 16.3125ZM9 11.7375C9.105 11.7375 9.2175 11.7675 9.3075 11.8275L13.6875 14.7075V2.8125H4.3125V14.7075L8.6925 11.8275C8.7825 11.7675 8.895 11.7375 9 11.7375Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_3097">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </dt>
            <dd className="mt-1">북마크</dd>
          </div>
          <div
            onClick={() =>
              localStorage.getItem("nickName") ? navigate(`/mypage`) : toLogin()
            }
            className="w-12 pt-2 pb-2 flex flex-col items-center"
          >
            <dt>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14.2525C9.825 14.2525 8.0625 12.4825 8.0625 10.315C8.0625 8.1475 9.825 6.3775 12 6.3775C14.175 6.3775 15.9375 8.1475 15.9375 10.315C15.9375 12.4825 14.175 14.2525 12 14.2525ZM12 7.5025C10.4475 7.5025 9.1875 8.7625 9.1875 10.315C9.1875 11.8675 10.4475 13.1275 12 13.1275C13.5525 13.1275 14.8125 11.8675 14.8125 10.315C14.8125 8.7625 13.5525 7.5025 12 7.5025Z"
                  fill="#222222"
                />
                <path
                  d="M5.24998 20.9425C5.19748 20.9425 5.14498 20.9425 5.09248 20.92C4.79248 20.8375 4.61998 20.5225 4.70248 20.2225C5.68498 16.7725 8.61748 14.455 12 14.455C15.3825 14.455 18.2925 16.765 19.29 20.2C19.38 20.5 19.2075 20.8075 18.9075 20.8975C18.6075 20.98 18.3 20.815 18.21 20.515C17.355 17.5675 14.865 15.5875 12.0075 15.5875C9.14998 15.5875 6.63748 17.575 5.79748 20.5375C5.72998 20.785 5.50498 20.9425 5.25748 20.9425H5.24998Z"
                  fill="#222222"
                />
              </svg>
            </dt>
            <dd className="mt-0.5">마이페이지</dd>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dock
