'use client'
import React, { useState, useEffect, useRef, useCallback } from "react"
import { isMobile } from "react-device-detect"
import * as fetchImages from "../(scripts)/fetchimages"
import 'swiper'
import * as Common from "../Common"
// import VrboView from "../views/VrboView";
import { register } from "swiper/element/bundle"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { useWindowSize } from '../(scripts)/sizing'
register()

interface Props {
  houseDetail: any;
}

interface houseImage {
  loaded:Boolean;
  images:any[];
}

interface RefObject {
  // immutable
  readonly current: any | null
}

const Listing = (props:Props) => {
  const listingDivRef:RefObject= useRef(null)
  const detailDivRef:RefObject = useRef(null)
  const swiperRef:RefObject = useRef(null)

  const amenityOptions = {
    gapSize: "5px",
  }

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return
    swiperRef.current.swiper.slideNext()
  }, [])

  const windowSize = useWindowSize()
  const vrboLink = props.houseDetail.vrboLink
  const imageName = props.houseDetail.img
  const title = props.houseDetail.title
  const numBedrooms = props.houseDetail.numBedrooms
  const maxCapacity = props.houseDetail.maxCapacity
  const numBathrooms = props.houseDetail.numBathrooms
  const amenities = props.houseDetail.amenities
  const location = props.houseDetail.location
  const picnum = props.houseDetail.picnum
  // const description = props.houseDetail.description;

  const narrow = false//windowSize.innerWidth < 700
  const narrow1k = false//windowSize.innerWidth < 1000
  const gapSize = narrow1k ? "20px" : "30px"
  const imageWidth =
    narrow && listingDivRef.current
      ? listingDivRef.current.offsetWidth
      : detailDivRef.current
        ? Math.max(detailDivRef.current.offsetHeight, 0)
        : 0

  const [houseImageState, setHouseImageState] = useState<houseImage>({
    loaded: false,
    images: [],
  })

  useEffect(() => {
    if (!houseImageState.loaded) {
      fetchImages.main("houses/" + imageName, (res) =>
        setHouseImageState({
          loaded: true,
          images: res,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slide = (id: number) => (
    <swiper-slide
      style={{
        display: "flex",
      }}
      key={"swiperChild" + id}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {houseImageState.loaded ? (
          <img
            alt={"house image " + id}
            src={houseImageState.images[id]}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          />
        ) : null}
      </div>
    </swiper-slide>
  )

  const Carousel = () => (
    <div style={CarouselStyle(narrow, imageWidth)}>
      <div style={LeftArrowDiv} onClick={handlePrev}>
        <img
          alt="carousel-left-arrow"
          style={ArrowImgStyle}
          src="listing/left-arrow.png"
        />
      </div>
      <div style={RightArrowDiv} onClick={handleNext}>
        <img
          alt="carousel-right-arrow"
          style={ArrowImgStyle}
          src="listing/right-arrow.png"
        />
      </div>
      <swiper-container
        cssMode={true}
        pagination={true}
        loop={true}
        // navigation="true"
        keyboard={true}
        style={SwiperStyle}
        ref={swiperRef}
      >
        {[...Array(picnum)].map((img, id) => {
          return slide(id)
        })}
      </swiper-container>
    </div>
  )

  const Stat = (params:any) => (
    <div style={StatStyle(narrow1k).box}>
      <div style={StatStyle(narrow1k).main}>
        <div style={StatStyle(narrow1k).imageAndCount}>
          <img
            alt={params.text}
            src={params.image}
            style={StatStyle(narrow1k).image}
          />
          <div style={StatStyle(narrow1k).count}>{params.value}</div>
        </div>
        <div style={StatStyle(narrow1k).text}>{params.text}</div>
      </div>
    </div>
  )

  const amenity_translations:any = {
    tennis: "Tennis court",
    barbecue: "Barbecue grill",
    lakenear: "Near lake",
    lake: "Lakeside",
    gym: "Shared gym",
    garden: "Garden",
    patio: "Patio",
    fireplace: "Fireplace",
    pool: "Pool",
  }

  const Amenity = (params:any) => (
    <div style={AmenityStyle(narrow1k, amenityOptions).box}>
      <div style={AmenityStyle(narrow1k, amenityOptions).innerBox}>
        <div style={AmenityStyle(narrow1k, amenityOptions).imgBackground}>
          <img
            alt=""
            style={{ height: "50%", border: "0px solid red" }}
            src={"amenities/" + params.text + ".png"}
          />
        </div>
        <div
          style={{
            border: "0px solid red",
            textAlign: "left",
            maxWidth: "100px",
          }}
        >
          {amenity_translations[params.text]}
        </div>
      </div>
    </div>
  )

  const DetailDiv = () => (
    <div style={DetailDivStyle(narrow)} ref={detailDivRef}>
      <div style={HeaderDiv(narrow1k)}>
        <div style={ScrollBlur(false)} />
        <div style={LocationDivContainer}>
          <div style={TitleDiv(narrow1k)}>{title}</div>
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "10px",
              backgroundColor: Common.mainColor,
              border: "1px solid " + Common.mainColor,
            }}
          />
          <div style={LocationDiv(narrow1k)}>{location}</div>
        </div>
      </div>
      <div style={StatStyle(narrow1k).container}>
        <Stat image="listing/bed.png" text="Bedrooms" value={numBedrooms} />
        <Stat image="listing/bath.png" text="Bathrooms" value={numBathrooms} />
        <Stat image="listing/people.png" text="Capacity" value={maxCapacity} />
      </div>
      <div style={AmenityStyle(narrow1k, amenityOptions).mainContainer}>
        {/* <div style={ScrollBlur(true)} />
        <div style={ScrollBlur(false)} /> */}
        <div
          className="hidescroll"
          style={AmenityStyle(narrow1k, amenityOptions).container}
        >
          <div style={AmenityStyle(narrow1k, amenityOptions).innerContainer}>
            {amenities.map((x:string, indx:number) =>
              indx % 2 === 0 ? <Amenity key={"top-amenity"+indx} text={x} /> : null
            )}
          </div>
          <div style={AmenityStyle(narrow1k, amenityOptions).innerContainer}>
            {amenities.map((x:string, indx:number) =>
              indx % 2 !== 0 ? <Amenity key={"bottom-amenity"+indx} text={x} /> : null
            )}
          </div>
        </div>
      </div>
      <div
        style={LearnMoreDiv}
        onClick={() =>
          window.open(vrboLink, isMobile ? "_self" : "_blank", "noreferrer")
        }
      >
        Learn more
      </div>
    </div>
  )

  return (
    <div style={{ ...mainStyle() }} ref={listingDivRef}>
      <div style={{ ...subStyle(narrow, gapSize) }}>
        <Carousel />
        <DetailDiv />
      </div>
    </div>
  )
}

export default Listing

const mainStyle: any = () => ({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
})

const subStyle: any  = (narrow:boolean, gapSize:number) => ({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: narrow ? "column" : "row",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  borderRadius: "15px",
  padding: narrow ? "0px" : gapSize,
  gap: narrow ? null : gapSize,
  overflow: "hidden",
})

const CarouselStyle: any = (narrow:boolean, imageWidth:number) => ({
  height: imageWidth,
  minWidth: imageWidth,
  width: imageWidth,
  borderRadius: narrow ? "0px" : "10px",
  overflow: "hidden",
  boxSizing: "border-box",
  position: "relative",
})

const SwiperStyle: any = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  "--swiper-pagination-color": Common.mainColor,
  "--swiper-pagination-bullet-inactive-color": "#FFF",
  "--swiper-pagination-bullet-inactive-opacity": "1",
  "--swiper-pagination-bullet-size": "10px",
  "--swiper-pagination-bullet-horizontal-gap": "2px",
  backgroundColor: "#EEE",
}

const DetailDivStyle: any = (narrow:boolean) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  position: "relative",
  width: narrow ? "100%" : null,
  padding: narrow ? "20px" : null,
  boxSizing: "border-box",
  gap: "10px",
})

const HeaderDiv: any = (narrow1k:boolean) => ({
  display: "flex",
  alignItems: "center",
  // border: "1px solid red",
  position: "relative",
  overflow: "hidden",
  height: narrow1k ? "25px" : "34px",
})

const LocationDivContainer: any = {
  display: "flex",
  textAlign: "left",
  gap: "5px",
  color: "grey",
  position: "absolute",
  // border: "1px solid purple",
  alignItems: "center",
  flex: "1",
  // paddingBottom: "3px",
}

const TitleDiv: any = (narrow1k:boolean) => ({
  display: "flex",
  fontWeight: "bold",
  fontSize: narrow1k ? "22px" : "30px",
  textAlign: "left",
  color: Common.mainColor,
  // border: "1px solid red",
  alignItems: "center",
  whiteSpace: "nowrap",
})

const LocationDiv: any = (narrow1k:boolean) => ({
  display: "flex",
  fontWeight: "400",
  fontSize: narrow1k ? "15px" : "19px",
  textAlign: "left",
  color: "grey",
  // border: "1px solid red",
  alignItems: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
  overflow: "hidden",
  // paddingBottom: "5px",
})

const StatStyle: any = (narrow1k:boolean) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    height: narrow1k ? "60px" : "60px",
  },
  box: {
    display: "flex",
    height: "100%",
    flex: 1,
    border: "1px solid " + Common.mainColor,
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    // border: "1px solid blue",
  },
  imageAndCount: {
    height: narrow1k ? "22px" : "25px",
    display: "flex",
    boxSizing: "border-box",
    gap: "5px",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid blue",
  },
  image: {
    height: "100%",
    display: "flex",
    boxSizing: "border-box",
    // border: "1px solid red",
  },
  count: {
    height: "100%",
    display: "flex",
    boxSizing: "border-box",
    fontWeight: "500",
    fontSize: narrow1k ? "15px" : "20px",
    alignItems: "center",
    color: Common.mainColor,
    // border: "1px solid green",
  },
  text: {
    display: "flex",
    boxSizing: "border-box",
    color: Common.mainColor,
    fontWeight: 400,
    fontSize: narrow1k ? "15px" : "20px",
    // border: "1px solid green",
  },
})

const AmenityStyle: any = (narrow1k:boolean, amenityOptions:any) => ({
  mainContainer: {
    display: "flex",
    height: narrow1k ? "155px" : "200px",
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
  },
  container: {
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    width: "100%",
    position: "absolute",
    overflow: "scroll",
    gap: amenityOptions.gapSize,
    flexDirection: "column",
    // border: "5px solid green",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: amenityOptions.gapSize,
    flex: 1,
    minWidth: "100%",
    boxSizing: "border-box",
    // border: "5px solid purple",
  },
  box: {
    boxSizing: "border-box",
    height: "100%",
    display: "flex",
    flex: 1,
    // minWidth: "150px",
    // width: "30%",
    backgroundColor: "white",
    borderRadius: "10px",
    // padding: "10px",
    border: "1px solid " + Common.mainColor,
    flexDirection: "column",
  },
  innerBox: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Common.mainColor,
    gap: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  imgBackground: {
    display: "flex",
    backgroundColor: Common.mainColor,
    height: narrow1k ? "40px" : "50px",
    width: narrow1k ? "40px" : "50px",
    minHeight: narrow1k ? "40px" : "50px",
    minWidth: narrow1k ? "40px" : "50px",
    borderRadius: "100px",
    alignItems: "center",
    justifyContent: "center",
  },
})

const LearnMoreDiv: any = {
  display: "flex",
  height: "60px",
  backgroundColor: Common.mainColor,
  borderRadius: "10px",
  color: "white",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}

const ArrowDiv: any = {
  display: "flex",
  position: "absolute",
  width: "50px",
  minHeight: "100%",
  top: 0,
  padding: "10px",
  zIndex: 10,
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  cursor: "pointer",
}

const LeftArrowDiv: any = {
  ...ArrowDiv,
  left: 0,
}
const RightArrowDiv: any = {
  ...ArrowDiv,
  right: 0,
}

const ArrowImgStyle: any = {
  width: "100%",
}

const ScrollBlur: any = (rightSide:boolean) => ({
  width: "20px",
  height: "100%",
  position: "absolute",
  zIndex: 1,
  right: !rightSide && 0,
  backgroundImage:
    "linear-gradient(to " +
    (rightSide ? "right" : "left") +
    ", rgba(255,255,255,1), rgba(0,0,0,0))",
})
