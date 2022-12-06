import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  __insertContent,
  __updataContent,
  __getContentDetail,
  insertTags,
  removeTags,
} from "../../redux/modules/contentsSlice"
import useInput from "../../hooks/useInput"
import useImgUpload from "../../hooks/useImgUpload"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Category from "../elements/Category"
import { searchTags, __getGuTag } from "../../redux/modules/searchSlice"
import TagSearch from "./TagSearch"
import TagInput from "./TagInput"
import ContentInput from "./ContentInput"
import ImgInput from "./ImgInput"

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //커스텀 훅 사용
  const [postInput, setPostInput, postInputHandle] = useInput({
    category: "",
    content: "",
  })
  const param = useParams("")

  //태그
  const [tag, setTag] = useState("")

  const onTagChange = (e) => {
    setTag(e.target.value)
  }
  // const tags = useSelector((state) => state.contents.tagList)
  const searchTag = useSelector((state) => state.search.searchTags)

  const [tags, setTags] = useState([])
  const insertTags = (e) => {
    console.log(e)
    setTags([...tags, e])
  }
  const removeTags = (e) => {
    setTags(tags.filter((t) => t !== e))
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  const onKeyUp = (e) => {
    if (e.keyCode === 188) {
      onButtonClick()
    }
  }

  const onButtonClick = (click) => {
    if (click === undefined) {
      const filtered = tag.replace(
        /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf ]/g,
        ""
      )
      if (filtered !== "") {
        insertTags(filtered)
        setTag("")
      } else {
        alert("태그를 입력해주세요.")
      }
    } else {
      insertTags(click)
      setTag("")
    }
  }

  const { isSuccess, error } = useSelector((state) => state)

  const state = useLocation()
  const data = state.state

  //이미지 업로드 훅
  const [files, fileUrls, uploadHandle, imgDelete] = useImgUpload(
    10,
    true,
    0.2,
    1000,
    false
  )
  //이미지 업로드 인풋돔 선택 훅
  const imgRef = useRef()

  //submit
  const onPost = (e) => {
    e.preventDefault()
    const formData = new FormData()
    //폼 데이터 관리
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("imageList", file)
      })
    } else {
    }

    let obj = {
      category: postInput.category,
      gu: param.gu,
      content: postInput.content,
      tagList: tags,
    }

    formData.append(
      "contents",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    )
    dispatch(__insertContent(formData))
  }

  useEffect(() => {}, [files])

  useEffect(() => {
    dispatch(searchTags(tag))
  }, [tag])

  useEffect(() => {
    dispatch(__getGuTag(param.gu))
  }, [])
  return (
    <>
      <form onKeyDown={onKeyDown} className="pl-[25px] pb-[190px]">
        <p className="text-sm text-bb22 font-medium">
          카테고리를 선택해주세요.
        </p>
        <Category postInput={postInput} postInputHandle={postInputHandle} />
        <div className="pr-[26px]">
          <ImgInput
            uploadHandle={uploadHandle}
            imgRef={imgRef}
            fileUrls={fileUrls}
            imgDelete={imgDelete}
          />
          <ContentInput
            postInput={postInput}
            postInputHandle={postInputHandle}
          />
          <TagInput
            tag={tag}
            onKeyUp={onKeyUp}
            onTagChange={onTagChange}
            onButtonClick={onButtonClick}
          />
          <TagSearch
            tags={tags}
            searchTag={searchTag}
            removeTags={removeTags}
            onButtonClick={onButtonClick}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="hover:cursor-pointer w-[128px] h-10 mt-3 rounded-full bg-gradient-to-r from-bbpink to-bbgradientp text-white text-sm font-medium"
              onClick={onPost}
              color="reverse"
              size="medium"
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Form
