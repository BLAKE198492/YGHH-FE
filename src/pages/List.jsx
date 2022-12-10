import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Post from "../components/list/Post"
import { contentsApis } from "../api/instance"
import length0 from "../assets/img/length0.png"
import Layout from "../components/layout/Layout"
import EditBtn from "../components/elements/EditBtn"
import { useInView } from "react-intersection-observer"
import HotTag from "../components/elements/HotTag"
import SelectGuInfo from "../components/elements/SelectGuInfo"
import { postList } from "../components/state/store"
import { useRecoilState } from "recoil"

const List = () => {
  const [posts, setPosts] = useRecoilState(postList)
  const [bookMarked, setBookMarked] = useState()

  const param = useParams()
  const navigate = useNavigate()
  const [select, setSelect] = useState(false)
  const [page, setPage] = useState(0) //페이지수
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()
  const onSelect = () => {
    setSelect(!select)
  }

  const getContent = async (payload) => {
    const res = await contentsApis.getContentAX(payload)
    const postList = res.data.data.postList
    if (page === 0) {
      setPosts(postList)
    } else {
      setPosts([...posts, ...postList])
    }
    setBookMarked(res.data.data.isBookmarked)

    return
  }
  const activateBookmark = async (payload) => {
    try {
      const res = await contentsApis.bookMarkAX(payload)
      return setBookMarked(res.data.data.bookmarked)
    } catch (error) {
      return
    }
  }

  const deactivateBookmark = async (payload) => {
    try {
      const res = await contentsApis.bookMarkOffAX(payload)
      return setBookMarked(res.data.data.bookmarked)
    } catch (error) {
      return
    }
  }

  const [hotTag, setHotTag] = useState(false)
  const onHotTag = () => {
    setHotTag(!hotTag)
  }

  useEffect(() => {
    setPage(0)
  }, [param])

  /**  서버에서 아이템을 가지고 오는 함수 */
  useEffect(() => {
    getContent(obj)
  }, [page, param])

  const setLocation = (l) => {
    localStorage.setItem("location", l)
  }
  const setGu = (g) => {
    localStorage.setItem("gu", g)
  }
  useEffect(() => {
    setLocation("list")
    setGu(param.gu)
    if (!window.scrollY) return
    // 현재 위치가 이미 최상단일 경우 return
    window.scrollTo({
      top: 0,
    })
  }, [])

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1)
    }
  }, [inView, loading])

  // useEffect(() => {

  // }, [])

  let obj = {
    gu: param.gu,
    sort: param.sort,
    category: param.category,
    page: page,
  }

  //북마크 활성화 함수
  const bookMarkOn = () => {
    activateBookmark(param.gu)
  }
  //북마크 비활성화 함수
  const bookMarkOff = (gu) => {
    deactivateBookmark(gu)
  }

  return (
    <div
      style={{
        overflow: select || hotTag ? "hidden" : "auto",
        height: select || hotTag ? "100vh" : "",
      }}
    >
      <Layout>
        <div className="pt-8 ml-[25px] mr-[26px]">
          <div>
            <div className=" font-normal text-sm">지금</div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex">
                <h1 className="font-bold text-xl">
                  {param.gu !== "중구" && param.gu !== "구로구"
                    ? param.gu.substring(0, param.gu.indexOf("구"))
                    : param.gu !== "구로구"
                    ? "중구"
                    : "구로"}
                  붐비
                </h1>
                {/* 북마크 토글러 함수 실행 */}
                {bookMarked ? (
                  <button onClick={() => bookMarkOff(param.gu)}>
                    <svg
                      className="hover:cursor-pointer active:animate-ping"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.99997 21C5.82818 20.9995 5.65943 20.9547 5.50997 20.87C5.3555 20.7832 5.22688 20.6569 5.13727 20.504C5.04766 20.3511 5.00027 20.1772 4.99997 20V5.33C4.98645 4.73032 5.2098 4.14946 5.6216 3.71332C6.03341 3.27718 6.6005 3.02089 7.19997 3H16.8C17.3994 3.02089 17.9665 3.27718 18.3783 3.71332C18.7901 4.14946 19.0135 4.73032 19 5.33V20C18.9989 20.1745 18.9522 20.3457 18.8645 20.4966C18.7768 20.6475 18.6511 20.7727 18.5 20.86C18.3479 20.9478 18.1755 20.994 18 20.994C17.8244 20.994 17.652 20.9478 17.5 20.86L11.83 17.65L6.49997 20.85C6.34952 20.9434 6.17698 20.9951 5.99997 21Z"
                        fill="#FFB800"
                      />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => bookMarkOn(param.gu)}>
                    <svg
                      className="hover:cursor-pointer active:animate-ping"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.08999 21.06C5.82477 21.06 5.57042 20.9546 5.38288 20.7671C5.19534 20.5796 5.08999 20.3252 5.08999 20.06L4.93999 5.39998C4.92795 5.10233 4.97487 4.80523 5.07806 4.52577C5.18125 4.24632 5.33868 3.99002 5.54127 3.77163C5.74387 3.55323 5.98765 3.37704 6.25859 3.25319C6.52952 3.12935 6.82227 3.06029 7.11999 3.04998L16.71 2.99998C17.0081 3.00519 17.3023 3.06908 17.5757 3.18799C17.8491 3.30691 18.0964 3.47852 18.3035 3.69304C18.5106 3.90755 18.6734 4.16076 18.7826 4.4382C18.8918 4.71564 18.9453 5.01187 18.94 5.30998L19.08 19.97C19.0817 20.1452 19.0373 20.3178 18.9513 20.4705C18.8653 20.6232 18.7407 20.7506 18.59 20.84C18.438 20.9278 18.2655 20.974 18.09 20.974C17.9145 20.974 17.742 20.9278 17.59 20.84L11.89 17.68L6.59999 20.91C6.44334 20.9975 6.26906 21.0487 6.08999 21.06ZM11.85 15.51C12.0238 15.5103 12.195 15.5514 12.35 15.63L17.06 18.24L16.94 5.28998C16.94 5.08998 16.81 4.94998 16.73 4.95998L7.12999 5.04998C7.04999 5.04998 6.93999 5.17998 6.93999 5.37998L7.05999 18.28L11.34 15.65C11.4954 15.561 11.6709 15.5128 11.85 15.51Z"
                        fill="#222222"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div onClick={onSelect} className="z-20">
                {select ? (
                  <>
                    <svg
                      className="hover:cursor-pointer transition-transform duration-300 rotate-180"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16Z"
                        fill="#231F20"
                      />
                    </svg>
                    <div className="w-full h-full px-auto fixed top-[130px] left-0 bg-bbLpurple">
                      <div className="mt-3 w-[90%] max-w-[375px] mx-auto">
                        <SelectGuInfo />
                      </div>
                    </div>
                  </>
                ) : (
                  <svg
                    className="hover:cursor-pointer transition-transform duration-300 rotate-0"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16C11.7664 16.0005 11.5399 15.9191 11.36 15.77L5.36003 10.77C5.15581 10.6003 5.02739 10.3564 5.00301 10.0919C4.97863 9.8275 5.06029 9.56422 5.23003 9.36C5.39977 9.15578 5.64368 9.02736 5.90811 9.00298C6.17253 8.9786 6.43581 9.06026 6.64003 9.23L12 13.71L17.36 9.39C17.4623 9.30694 17.58 9.2449 17.7064 9.20747C17.8327 9.17004 17.9652 9.15795 18.0962 9.17189C18.2272 9.18582 18.3542 9.22552 18.4699 9.2887C18.5855 9.35187 18.6875 9.43727 18.77 9.54C18.8616 9.64282 18.931 9.76345 18.9738 9.89432C19.0166 10.0252 19.0319 10.1635 19.0187 10.3006C19.0056 10.4376 18.9643 10.5705 18.8974 10.6909C18.8305 10.8112 18.7395 10.9165 18.63 11L12.63 15.83C12.4449 15.9555 12.2231 16.0154 12 16Z"
                      fill="#231F20"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <div className="flex felx-nowrap h-12 mt-6 mb-4 pl-6">
            {param.category === "all" ? (
              <button className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-sm font-medium bg-bbpurple text-white w-20 h-10 rounded-full mr-3">
                전체
              </button>
            ) : (
              <button
                onClick={() => navigate(`/list/${param.gu}/all/${param.sort}`)}
                className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-[14px] font-medium bg-white text-bb22 active:bg-bbpurple active:text-white w-20 h-10 rounded-full mr-3"
              >
                전체
              </button>
            )}
            {param.category === "공유" ? (
              <button className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-sm font-medium bg-bbpurple text-white w-20 h-10 rounded-full mr-3">
                공유
              </button>
            ) : (
              <button
                onClick={() => navigate(`/list/${param.gu}/공유/${param.sort}`)}
                className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-[14px] font-medium bg-white text-bb22 active:bg-bbpurple active:text-white w-20 h-10 rounded-full mr-3"
              >
                공유
              </button>
            )}
            {param.category === "질문" ? (
              <button className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-sm font-medium bg-bbpurple text-white w-20 h-10 rounded-full mr-3">
                질문
              </button>
            ) : (
              <button
                onClick={() => navigate(`/list/${param.gu}/질문/${param.sort}`)}
                className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-[14px] font-medium bg-white text-bb22 active:bg-bbpurple active:text-white w-20 h-10 rounded-full mr-3"
              >
                질문
              </button>
            )}
            {param.category === "맛집" ? (
              <button className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-sm font-medium bg-bbpurple text-white w-20 h-10 rounded-full mr-3">
                맛집
              </button>
            ) : (
              <button
                onClick={() => navigate(`/list/${param.gu}/맛집/${param.sort}`)}
                className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-[14px] font-medium bg-white text-bb22 active:bg-bbpurple active:text-white w-20 h-10 rounded-full mr-3"
              >
                맛집
              </button>
            )}
            {param.category === "일상" ? (
              <button className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-sm font-medium bg-bbpurple text-white w-20 h-10 rounded-full mr-3">
                일상
              </button>
            ) : (
              <button
                onClick={() => navigate(`/list/${param.gu}/일상/${param.sort}`)}
                className="shrink-0 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] text-[14px] font-medium bg-white text-bb22 active:bg-bbpurple active:text-white w-20 h-10 rounded-full mr-3"
              >
                일상
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between mx-[26px] text-sm">
          <div>
            {param.sort === "new" ? (
              <button
                className="mr-3 font-bold text-bb22"
                onClick={() =>
                  navigate(`/list/${param.gu}/${param.category}/new`)
                }
              >
                최신순
              </button>
            ) : (
              <button
                className="text-bb88 font-medium mr-3"
                onClick={() =>
                  navigate(`/list/${param.gu}/${param.category}/new`)
                }
              >
                최신순
              </button>
            )}
            |
            {param.sort === "new" ? (
              <button
                className="text-bb88 font-medium ml-3"
                onClick={() =>
                  navigate(`/list/${param.gu}/${param.category}/hot`)
                }
              >
                인기순
              </button>
            ) : (
              <button
                className="text-bb22 font-bold ml-3"
                onClick={() =>
                  navigate(`/list/${param.gu}/${param.category}/hot`)
                }
              >
                인기순
              </button>
            )}
          </div>
          <button className="text-[#ff3535] font-bold" onClick={onHotTag}>
            🔥HOT-TAG 20
          </button>
        </div>
        <div className="relative">
          <div
            className={
              hotTag
                ? "absolute right-0 z-20 pl-[25px] pr-[26px] mt-3 w-[100%] max-w-[420px] mx-auto"
                : "hidden"
            }
          >
            <HotTag onHotTag={onHotTag} hotTag={hotTag} />
          </div>
        </div>
        <div className="ml-[25px] mr-[26px] mt-[16px]">
          {posts && <Post posts={posts} />}

          {posts && posts.length === 0 ? (
            <div className="text-center mt-[102px] text-bb88 font-medium">
              <img className="w-[96px] mb-[8px] mx-auto" src={length0} />
              <p className="text-b24 ">앗!</p>
              <p className="text-b16">아직 게시글이 없어요.</p>
            </div>
          ) : (
            ""
          )}
          <div ref={ref}></div>
        </div>
        <EditBtn />
      </Layout>
    </div>
  )
}

export default List
