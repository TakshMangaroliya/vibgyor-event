"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import {
  Search,
  Grid,
  List,
  Calendar,
  MapPin,
  ImageIcon,
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Camera,
  Users,
  Plus,
  Upload,
  X,
  Link,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

const PhotoPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ALL COLLECTIONS")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageUploader, setShowImageUploader] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [uploadedImages, setUploadedImages] = useState([])
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef(null)

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  // Sample data for all collections (moved outside to be mutable for client-side updates)
  // In a real application, this would come from an API and be managed by state/context
  const initialCollections = [
    {
      id: 1,
      title: "Royal Wedding Ceremony",
      category: "WEDDINGS",
      imageCount: 45,
      date: "December 15, 2023",
      location: "Udaipur Palace, Rajasthan",
      image:
        "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img/https://www.ptaufiqphotography.com/wp-content/uploads/2024/06/ptaufiq-indian-wedding-rajkot-India-ceremony-couple-portraits.jpg",
      description:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
       description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "The Sharma Family",
      duration: "3 Days",
      totalImages: 8,
      photographer: "Arjun Mehta",
      guests: "500+ Guests",
      galleryImages: [
        "https://cdn0.weddingwire.in/article/1405/3_2/960/jpg/125041-indian-wedding-photography-timeline-shutterdown.jpeg",
        "https://lifestoryeventz.in/wp-content/uploads/2019/11/wed.jpg",
        "https://image.wedmegood.com/resized/720X/uploads/member/713320/1738405553_17_wedding_reception.jpg",
        "https://www.brides.com/thmb/ZeoE3HTrY5cOE1cmsxn7mEKKEUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sq-7b6422ce9ac04516994d449dba5e2b96.jpg",
        "https://static.wixstatic.com/media/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg/v1/fill/w_640,h_414,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg",
        "https://www.brides.com/thmb/wsr0Mj20xZwh-BYJlB9Dwwzxg2w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/winslow-and-angus-wedding-29-2ea33a526fa3406ba0519bd200c0115d.jpg",
        "https://anilevents.in/wp-content/uploads/2020/02/WhatsApp-Image-2020-02-19-at-1.10.38-AM.jpeg",
        "https://media-api.xogrp.com/images/93ddc5c5-e090-432a-b781-90835b5aea3c~rs_768.h"
      ],
    },
    {
      id: 2,
      title: "Tech Summit 2023",
      category: "CORPORATE",
      imageCount: 32,
      date: "November 20, 2023",
      location: "Mumbai Convention Center",
      image: "https://www.starseventdesign.com/wp-content/uploads/2015/07/Corporate-Events.jpg",
      description:
        "A groundbreaking technology summit bringing together industry leaders and innovators from across the globe. We focused on capturing keynotes, panel discussions, and networking sessions, highlighting the intellectual exchange and professional interactions. The dynamic atmosphere of innovation and collaboration was a central theme, with candid shots of participants engaging in discussions and demonstrations. This event showcased the latest advancements and future trends in technology, and our photography aimed to reflect its cutting-edge nature and importance within the corporate world. Every image tells a story of progress and connection in the tech industry.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "TechCorp Industries",
      duration: "2 Days",
      totalImages: 32,
      photographer: "Arjun Mehta",
      guests: "800+ Attendees",
      galleryImages: [
        "https://mythsmusic.com/wp-content/uploads/2019/08/Corporate-Event-Management.jpg",
        "https://grandfestive.com/img/corporate-event-management-services.jpg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg",
        "https://5.imimg.com/data5/BW/WO/MY-38679691/corporate-event-management.jpg",
        "https://tavitsphotography.com/wp-content/uploads/2019/10/Troon-Global-Leadership-Conference-2019-109.jpg",
        "https://www.fredericpaulussen.be/wp-content/uploads/2020/05/photography-prices-for-events-1.jpg",
        "https://icorporateevents.in/wp-content/uploads/2025/03/Promote-Special-Events-in-goajpeg-1.jpeg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg"
      ],
    },
    {
      id: 3,
      title: "Classical Music Evening",
      category: "CONCERTS",
      imageCount: 28,
      date: "October 15, 2023",
      location: "Delhi Opera House",
      image:
        "https://imageio.forbes.com/specials-images/imageserve//628c06f838d3f4bcb05ca2cd/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
      description:
        "An enchanting evening of classical music featuring renowned artists, where every note resonated with elegance and passion. Our photography focused on capturing the performers' intense concentration, the conductor's expressive gestures, and the audience's rapt attention. The magnificent architecture of the Delhi Opera House provided a majestic setting, enhancing the timeless beauty of the compositions. We aimed to convey the emotional depth and the captivating atmosphere of the concert, preserving the fleeting moments of musical brilliance. Each image reflects the harmony of tradition and artistic expression.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Delhi Cultural Society",
      duration: "1 Day",
      totalImages: 28,
      photographer: "Arjun Mehta",
      guests: "300+ Music Lovers",
      galleryImages: [
        "https://images.moneycontrol.com/static-mcnews/2024/03/Darshan-Raval-2.jpeg?impolicy=website&width=770&height=431",
        "https://res.cloudinary.com/simpleview/image/upload/v1476755307/clients/denver/red-rocks-winter-concert-1_567ca252-f0ae-5102-065b6b925d495a29.jpg",
        "https://brownpalace.wordpress.com/wp-content/uploads/2013/04/screen-shot-2013-04-24-at-1-29-42-pm.png",
        "https://www.tottenhamhotspur.com/media/ogcdr1h4/concerts-events-ths-16x9.jpg?anchor=center&mode=crop&quality=90&width=750",
        "https://www.ischgl.com/deskline/events/events/Top%20of%20the%20Mountain%20Closing%20Concert_109143845/152221875/image-thumb__152221875__hero/closing_118929697.jpg",
        "https://utsav.gov.in/public/uploads/event_picture_image/event_124/1662711901284147996.png",
        "https://networksites.livenationinternational.com/networksites/lnxx-event-discovery-placeholder.jpg?format=webp&width=3840&quality=75",
        "https://www.winsport.ca/assets/images/Events/Event-Facility-Rentals/Event-Centre/Winsport_CAPL-3291__ScaleWidthWzEyNTVd.jpg"
      ],
    },
    {
      id: 4,
      title: "Destination Wedding Goa",
      category: "WEDDINGS",
      imageCount: 67,
      date: "January 2024",
      location: "Goa Beach Resort",
      image: "https://cdn.eventplanner.co.uk/img4/lp/wedding/lp-wedding-venue.jpg",
      description:
        "A dreamy beachside wedding celebration with the golden sunset as the backdrop, creating a truly magical atmosphere. We captured the vibrant energy of the pre-wedding festivities, the serene beauty of the beachfront ceremony, and the lively reception under the stars. Every photograph reflects the joy, laughter, and tender moments shared by the couple and their loved ones. The natural beauty of Goa, combined with the elegant decor, provided a picturesque setting for this unforgettable destination wedding, where romance truly met paradise. Our goal was to tell the complete story of their special day, from dawn till dusk.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "The Patel Family",
      duration: "4 Days",
      totalImages: 67,
      photographer: "Arjun Mehta",
      guests: "200+ Guests",
      galleryImages: [
        "https://cdn0.weddingwire.in/article/1405/3_2/960/jpg/125041-indian-wedding-photography-timeline-shutterdown.jpeg",
        "https://lifestoryeventz.in/wp-content/uploads/2019/11/wed.jpg",
        "https://image.wedmegood.com/resized/720X/uploads/member/713320/1738405553_17_wedding_reception.jpg",
        "https://www.brides.com/thmb/ZeoE3HTrY5cOE1cmsxn7mEKKEUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sq-7b6422ce9ac04516994d449dba5e2b96.jpg",
        "https://static.wixstatic.com/media/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg/v1/fill/w_640,h_414,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg",
        "https://www.brides.com/thmb/wsr0Mj20xZwh-BYJlB9Dwwzxg2w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/winslow-and-angus-wedding-29-2ea33a526fa3406ba0519bd200c0115d.jpg",
        "https://anilevents.in/wp-content/uploads/2020/02/WhatsApp-Image-2020-02-19-at-1.10.38-AM.jpeg",
        "https://media-api.xogrp.com/images/93ddc5c5-e090-432a-b781-90835b5aea3c~rs_768.h"
      ],
    },
    {
      id: 5,
      title: "Corporate Annual Meet",
      category: "CORPORATE",
      imageCount: 24,
      date: "September 2023",
      location: "Bangalore Tech Park",
      image: "https://www.aleitevents.com/wp-content/uploads/2019/02/220805_ABSA_008.jpg",
      description:
        "Our photography captured the essence of teamwork and success at this annual corporate gathering. We focused on key presentations, interactive workshops, and informal networking sessions, showcasing the professionalism and camaraderie among employees. The modern setting of Bangalore Tech Park provided a sleek backdrop for capturing moments of innovation and collaboration. The aim was to create a visual narrative of the company's achievements over the past year and its future vision, reflecting the vibrant corporate culture. Every image highlights the dedication and hard work of the team.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Bangalore Tech Solutions",
      duration: "1 Day",
      totalImages: 24,
      photographer: "Arjun Mehta",
      guests: "150+ Employees",
      galleryImages: [
        "https://mythsmusic.com/wp-content/uploads/2019/08/Corporate-Event-Management.jpg",
        "https://grandfestive.com/img/corporate-event-management-services.jpg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg",
        "https://5.imimg.com/data5/BW/WO/MY-38679691/corporate-event-management.jpg",
        "https://tavitsphotography.com/wp-content/uploads/2019/10/Troon-Global-Leadership-Conference-2019-109.jpg",
        "https://www.fredericpaulussen.be/wp-content/uploads/2020/05/photography-prices-for-events-1.jpg",
        "https://icorporateevents.in/wp-content/uploads/2025/03/Promote-Special-Events-in-goajpeg-1.jpeg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg"
      ],
    },
    {
      id: 6,
      title: "Rock Concert Live",
      category: "CONCERTS",
      imageCount: 89,
      date: "August 2023",
      location: "Mumbai Stadium",
      image:
        "https://cdn.rwsglobal.com/wp-content/uploads/2024/11/Festivals-Concerts_Event-Mangement.jpg?strip=all&lossy=1&ssl=1",
      description:
        "Experience the high-energy thrill of a live rock concert with electrifying performances that set the stage ablaze. Our lenses captured the raw energy and passion of the musicians, the pulsating lights, and the roaring crowd in its purest form. From close-ups of guitar solos to wide shots of the massive audience, every image encapsulates the unforgettable atmosphere of rock and roll. The deafening cheers and vibrant stage presence were meticulously documented, bringing the intensity of the live show to life through our photography. It was a night of pure adrenaline and musical magic.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Mumbai Music Festival",
      duration: "1 Day",
      totalImages: 89,
      photographer: "Arjun Mehta",
      guests: "5000+ Rock Fans",
      galleryImages: [
         "https://images.moneycontrol.com/static-mcnews/2024/03/Darshan-Raval-2.jpeg?impolicy=website&width=770&height=431",
        "https://res.cloudinary.com/simpleview/image/upload/v1476755307/clients/denver/red-rocks-winter-concert-1_567ca252-f0ae-5102-065b6b925d495a29.jpg",
        "https://brownpalace.wordpress.com/wp-content/uploads/2013/04/screen-shot-2013-04-24-at-1-29-42-pm.png",
        "https://www.tottenhamhotspur.com/media/ogcdr1h4/concerts-events-ths-16x9.jpg?anchor=center&mode=crop&quality=90&width=750",
        "https://www.ischgl.com/deskline/events/events/Top%20of%20the%20Mountain%20Closing%20Concert_109143845/152221875/image-thumb__152221875__hero/closing_118929697.jpg",
        "https://utsav.gov.in/public/uploads/event_picture_image/event_124/1662711901284147996.png",
        "https://networksites.livenationinternational.com/networksites/lnxx-event-discovery-placeholder.jpg?format=webp&width=3840&quality=75",
        "https://www.winsport.ca/assets/images/Events/Event-Facility-Rentals/Event-Centre/Winsport_CAPL-3291__ScaleWidthWzEyNTVd.jpg"
      ],
    },
    {
      id: 7,
      title: "Art Gallery Opening",
      category: "EXHIBITIONS",
      imageCount: 15,
      date: "July 2023",
      location: "Delhi Art Center",
      image: "https://4.imimg.com/data4/TU/GV/MY-20979260/events.jpg",
      description:
        "A sophisticated art gallery opening featuring a diverse collection of contemporary works. Our elegant documentation captured the essence of art, culture, and refined social gathering. We focused on the intricate details of the artworks, the engaging interactions between artists and patrons, and the overall ambiance of intellectual curiosity and aesthetic appreciation. The lighting and layout of the Delhi Art Center provided a perfect backdrop for showcasing these masterpieces. Each photograph tells a story of creative expression and cultural dialogue, preserving the beauty and significance of this artistic event.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Delhi Art Foundation",
      duration: "1 Day",
      totalImages: 15,
      photographer: "Arjun Mehta",
      guests: "100+ Art Enthusiasts",
      galleryImages: [
        "https://www.gl-events.com/sites/default/files/styles/max_2600x2600/public/2019-03/global-industry-salon-exhibitions.jpg?itok=xTtCSeRs",
        "https://www.dreamcast.in/blog/wp-content/uploads/2024/07/Exhibitions-and-Trade-Shows.jpg",
        "https://images.squarespace-cdn.com/content/v1/582af0705016e1e43d9b1231/1485341423669-7BVGEO0P3F7D93KRSEE1/Exhbition+%26+Event+Mangement.jpg?format=1000w",
        "https://knect365.imgix.net/uploads/20240612-124316-2--6a6b5f980294585c9839668a476166d2.jpg?auto=format&fit=max&w=412&dpr=5",
        "https://www.wdsoft.in/wp-content/uploads/2024/08/Stall-design-service-by-wdsoft-agency.webp",
        "https://media.licdn.com/dms/image/v2/D5612AQFsVuYXRP38Nw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691544755974?e=2147483647&v=beta&t=RqnF6Cs_sqZu124BM103066oIzS378eKqcyFI-lFs_Y",
        "https://msblogs.thesourcemediaassets.com/2024/02/Joanna-Blog-image_960x540.png",
        "https://images.squarespace-cdn.com/content/v1/5bf4b28efcf7fd808913da83/1616454956123-35Q7SNR1253JQO4BYFYA/FRD-WAM-WildLife-2.jpg"
      ],
    },
    {
      id: 8,
      title: "Fashion Week Backstage",
      category: "EXHIBITIONS",
      imageCount: 42,
      date: "June 2023",
      location: "Mumbai Fashion Hub",
      image: "https://t4.ftcdn.net/jpg/03/64/84/17/360_F_364841766_qc35nrh5wUCWEsBQTxQmqleNQX8C5W2m.jpg",
      description:
        "A captivating behind-the-scenes glimpse of fashion week preparations, capturing the creativity, chaos, and beauty of the fashion industry. Our photography documented the intricate work of designers, stylists, and models, from the final touches on garments to the frantic energy of pre-show lineups. We focused on the raw moments of concentration, teamwork, and transformation that precede the glamorous runway. Every image tells a story of dedication and artistry, showcasing the unseen efforts that bring fashion to life.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Mumbai Fashion Council",
      duration: "3 Days",
      totalImages: 42,
      photographer: "Arjun Mehta",
      guests: "Fashion Industry",
      galleryImages: [
        "https://www.gl-events.com/sites/default/files/styles/max_2600x2600/public/2019-03/global-industry-salon-exhibitions.jpg?itok=xTtCSeRs",
        "https://www.dreamcast.in/blog/wp-content/uploads/2024/07/Exhibitions-and-Trade-Shows.jpg",
        "https://images.squarespace-cdn.com/content/v1/582af0705016e1e43d9b1231/1485341423669-7BVGEO0P3F7D93KRSEE1/Exhbition+%26+Event+Mangement.jpg?format=1000w",
        "https://knect365.imgix.net/uploads/20240612-124316-2--6a6b5f980294585c9839668a476166d2.jpg?auto=format&fit=max&w=412&dpr=5",
        "https://www.wdsoft.in/wp-content/uploads/2024/08/Stall-design-service-by-wdsoft-agency.webp",
        "https://media.licdn.com/dms/image/v2/D5612AQFsVuYXRP38Nw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1691544755974?e=2147483647&v=beta&t=RqnF6Cs_sqZu124BM103066oIzS378eKqcyFI-lFs_Y",
        "https://msblogs.thesourcemediaassets.com/2024/02/Joanna-Blog-image_960x540.png",
        "https://images.squarespace-cdn.com/content/v1/5bf4b28efcf7fd808913da83/1616454956123-35Q7SNR1253JQO4BYFYA/FRD-WAM-WildLife-2.jpg"
      ],
    },
    {
      id: 9,
      title: "Charity Gala Night",
      category: "GALAS",
      imageCount: 33,
      date: "May 2023",
      location: "Delhi Grand Hotel",
      image:
        "https://eventologists.co.uk/wp-content/uploads/photo-gallery/Eventologists-Gala-Award-Dinner-styling-ideas-2.jpg?bwg=1703198084",
      description:
        "An elegant charity gala bringing together philanthropists for a noble cause, filled with warmth and generosity. Our sophisticated event photography captured the glamour of the attendees, the heartfelt speeches, and the spirit of giving that permeated the evening. We documented the exquisite decor, the lively auctions, and the meaningful interactions, ensuring that every moment of this impactful event was beautifully preserved. The aim was to highlight the collective effort towards a better community, showcasing both the elegance and the profound purpose of the night.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Delhi Charity Foundation",
      duration: "1 Day",
      totalImages: 33,
      photographer: "Arjun Mehta",
      guests: "250+ Philanthropists",
      galleryImages: [
        "https://media.istockphoto.com/id/1480109377/photo/success-hands-or-toast-in-a-party-for-goals-winning-deal-or-new-year-at-luxury-social-event.jpg?s=612x612&w=0&k=20&c=7O7m7lG6LVXY-rzr1NE4aVgkJhxjAnS25PkSM_jTN9c=",
        "https://d1uayvjp8uj8kk.cloudfront.net/static/magazine/67c5ef087cd91900010ff56b-b.webp",
        "https://soletsparty.co.uk/wp-content/uploads/2017/02/crystal-inspired-decorations-ice.png",
        "https://thumbs.dreamstime.com/b/decor-candles-lamps-corporate-event-gala-dinner-pink-purple-decor-candles-lamps-corporate-event-119332610.jpg",
        "https://media.istockphoto.com/id/1038049758/photo/wedding-hall-or-other-function-facility-set-for-fine-dining.jpg?s=612x612&w=0&k=20&c=DYW6MLLqUZ7Z6Cys3itVslOBkDsa-17cexOxtln5Oi0=",
        "https://i.pinimg.com/originals/30/f0/d5/30f0d5c92d80c2c8da586a363a6033dd.jpg",
        "https://thumbs.dreamstime.com/b/red-carpet-gala-event-spotlights-starry-backdrop-awards-366947039.jpg",
        "https://cleancomedians.com/wp-content/uploads/2021/12/A-gala-is-the-perfect-type-of-event-to-boost-brand-awareness-and-network-with-other-companies-and-organizations-1024x661.jpg"
      ],
    },
    {
      id: 10,
      title: "Awards Ceremony",
      category: "GALAS",
      imageCount: 56,
      date: "April 2023",
      location: "Mumbai Convention Hall",
      image: "https://www.paperlesspost.com/blog/wp-content/uploads/Blog02_GalaThemes_BlackAndWhiteGala.png",
      description:
        "A prestigious awards ceremony celebrating excellence across various industries. Our formal event photography captured moments of recognition and achievement, highlighting the triumphs of individuals and organizations. We focused on capturing the grand entrance, the emotional acceptance speeches, and the joyous celebrations. The elegant decor of the Mumbai Convention Hall provided a sophisticated backdrop for this esteemed gathering. Each photograph tells a story of dedication, hard work, and success, preserving the essence of this high-profile event and its celebrated honorees.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Mumbai Business Awards",
      duration: "1 Day",
      totalImages: 56,
      photographer: "Arjun Mehta",
      guests: "400+ Industry Leaders",
      galleryImages: [
        "https://media.istockphoto.com/id/1480109377/photo/success-hands-or-toast-in-a-party-for-goals-winning-deal-or-new-year-at-luxury-social-event.jpg?s=612x612&w=0&k=20&c=7O7m7lG6LVXY-rzr1NE4aVgkJhxjAnS25PkSM_jTN9c=",
        "https://d1uayvjp8uj8kk.cloudfront.net/static/magazine/67c5ef087cd91900010ff56b-b.webp",
        "https://soletsparty.co.uk/wp-content/uploads/2017/02/crystal-inspired-decorations-ice.png",
        "https://thumbs.dreamstime.com/b/decor-candles-lamps-corporate-event-gala-dinner-pink-purple-decor-candles-lamps-corporate-event-119332610.jpg",
        "https://media.istockphoto.com/id/1038049758/photo/wedding-hall-or-other-function-facility-set-for-fine-dining.jpg?s=612x612&w=0&k=20&c=DYW6MLLqUZ7Z6Cys3itVslOBkDsa-17cexOxtln5Oi0=",
        "https://i.pinimg.com/originals/30/f0/d5/30f0d5c92d80c2c8da586a363a6033dd.jpg",
        "https://thumbs.dreamstime.com/b/red-carpet-gala-event-spotlights-starry-backdrop-awards-366947039.jpg",
        "https://cleancomedians.com/wp-content/uploads/2021/12/A-gala-is-the-perfect-type-of-event-to-boost-brand-awareness-and-network-with-other-companies-and-organizations-1024x661.jpg"
      ],
    },
    {
      id: 11,
      title: "Traditional Wedding Rajasthan",
      category: "WEDDINGS",
      imageCount: 78,
      date: "March 2024",
      location: "Jaipur Heritage Hotel",
      image: "https://i.pinimg.com/564x/42/9b/af/429baf18cbb66c62afa1fcb44918dd6e.jpg",
      description:
        "A rich traditional Rajasthani wedding steeped in culture and heritage, a true spectacle of vibrant colors and ancient rituals. Our photography beautifully documented every aspect, from the intricate pre-wedding ceremonies like the Haldi and Mehendi, to the grand procession of the groom and the sacred wedding rituals. The majestic Jaipur Heritage Hotel provided a royal backdrop, enhancing the timeless traditions and opulent celebrations. Every image captures the joy, the elaborate attire, and the deep cultural significance of this multi-day event, creating a stunning visual narrative of love and tradition.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "The Rajput Family",
      duration: "5 Days",
      totalImages: 78,
      photographer: "Arjun Mehta",
      guests: "600+ Guests",
      galleryImages: [
        "https://cdn0.weddingwire.in/article/1405/3_2/960/jpg/125041-indian-wedding-photography-timeline-shutterdown.jpeg",
        "https://lifestoryeventz.in/wp-content/uploads/2019/11/wed.jpg",
        "https://image.wedmegood.com/resized/720X/uploads/member/713320/1738405553_17_wedding_reception.jpg",
        "https://www.brides.com/thmb/ZeoE3HTrY5cOE1cmsxn7mEKKEUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sq-7b6422ce9ac04516994d449dba5e2b96.jpg",
        "https://static.wixstatic.com/media/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg/v1/fill/w_640,h_414,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86622c_ecabd79f25de4d79adb0f22479c3964f~mv2.jpg",
        "https://www.brides.com/thmb/wsr0Mj20xZwh-BYJlB9Dwwzxg2w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/winslow-and-angus-wedding-29-2ea33a526fa3406ba0519bd200c0115d.jpg",
        "https://anilevents.in/wp-content/uploads/2020/02/WhatsApp-Image-2020-02-19-at-1.10.38-AM.jpeg",
        "https://media-api.xogrp.com/images/93ddc5c5-e090-432a-b781-90835b5aea3c~rs_768.h"
      ],
    },
    {
      id: 12,
      title: "Product Launch Event",
      category: "CORPORATE",
      imageCount: 19,
      date: "February 2024",
      location: "Chennai Tech Center",
      image: "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/Locate-Your-Events-Purpose.jpg",
      description:
        "An innovative product launch event showcasing cutting-edge technology and marking a significant corporate milestone. Our professional photography captured the excitement of the reveal, the intricate details of the new product, and the enthusiastic reactions of industry experts and attendees. We documented keynote speeches, interactive demonstrations, and networking opportunities, highlighting the forward-thinking nature of the company. The sleek and modern Chennai Tech Center provided an ideal backdrop for this introduction to the market, ensuring every photograph conveyed the impact and innovation of the launch.",
         description2:
        "An opulent celebration of love set against the majestic backdrop of Udaipur's royal palace. Every detail meticulously crafted to create an unforgettable experience, from the vibrant pre-wedding rituals to the grand reception. We captured the joyous laughter, the sacred vows, and the intricate traditions that made this wedding truly unique. The regal architecture and the lush gardens provided a stunning canvas for this extraordinary event, making every photograph a work of art that tells a story of enduring love and cultural richness. The event spanned multiple days, each filled with distinct ceremonies and heartfelt moments, all preserved through our lens.",
      client: "Chennai Innovations Ltd",
      duration: "1 Day",
      totalImages: 19,
      photographer: "Arjun Mehta",
      guests: "120+ Industry Experts",
      galleryImages: [
       "https://mythsmusic.com/wp-content/uploads/2019/08/Corporate-Event-Management.jpg",
        "https://grandfestive.com/img/corporate-event-management-services.jpg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg",
        "https://5.imimg.com/data5/BW/WO/MY-38679691/corporate-event-management.jpg",
        "https://tavitsphotography.com/wp-content/uploads/2019/10/Troon-Global-Leadership-Conference-2019-109.jpg",
        "https://www.fredericpaulussen.be/wp-content/uploads/2020/05/photography-prices-for-events-1.jpg",
        "https://icorporateevents.in/wp-content/uploads/2025/03/Promote-Special-Events-in-goajpeg-1.jpeg",
        "https://www.brandway.co.in/wp-content/uploads/2019/11/corporate-Events.jpg"
      ],
    },
  ]

  // Use a state for allCollections so it can be updated
  const [allCollections, setAllCollections] = useState(initialCollections);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      "ALL COLLECTIONS": allCollections.length,
      WEDDINGS: 0,
      CORPORATE: 0,
      CONCERTS: 0,
      EXHIBITIONS: 0,
      GALAS: 0,
    }

    allCollections.forEach((item) => {
      counts[item.category]++
    })

    return counts
  }, [allCollections])

  // Filter collections based on active category and search term
  const filteredCollections = useMemo(() => {
    let filtered = allCollections

    // Filter by category
    if (activeCategory !== "ALL COLLECTIONS") {
      filtered = filtered.filter((item) => item.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [activeCategory, searchTerm, allCollections])

  const categories = ["ALL COLLECTIONS", "WEDDINGS", "CORPORATE", "CONCERTS", "EXHIBITIONS", "GALAS"]

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection)
  }

  const handleBackToGallery = () => {
    setSelectedCollection(null)
    setShowImageUploader(false)
    setUploadedImages([])
    setUrlInput("")
  }

  // Enhanced Image Upload Functions
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    imageFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages(prev => [...prev, e.target.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      setUploadedImages(prev => [...prev, urlInput.trim()])
      setUrlInput("")
    }
  }

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddImages = () => {
    if (uploadedImages.length > 0 && selectedCollection) {
      setAllCollections(prevCollections =>
        prevCollections.map(collection =>
          collection.id === selectedCollection.id
            ? { ...collection, galleryImages: [...collection.galleryImages, ...uploadedImages] }
            : collection
        )
      )
      setSelectedCollection(prevSelected => ({
        ...prevSelected,
        galleryImages: [...prevSelected.galleryImages, ...uploadedImages]
      }))
      setUploadedImages([])
      setShowImageUploader(false)
    }
  }

  // Image Uploader Component
  const ImageUploader = () => {
    return (
      <div className="fixed inset-0  bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl  max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">Add Images</h2>
            <button 
              onClick={() => setShowImageUploader(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'upload' 
                  ? 'border-b-2 border-purple-600 text-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'url' 
                  ? 'border-b-2 border-purple-600 text-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Link className="w-5 h-5 inline mr-2" />
              Add from URL
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {activeTab === 'upload' ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drag and drop images here
                  </p>
                  <p className="text-gray-600 mb-4">
                    or click to browse files
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="url"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
                  />
                  <button
                    onClick={handleUrlAdd}
                    disabled={!urlInput.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Make sure the URL points directly to an image file (jpg, png, gif, etc.)
                </p>
              </div>
            )}

            {/* Preview of uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Preview ({uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''} ready to upload
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowImageUploader(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddImages}
                disabled={uploadedImages.length === 0}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {uploadedImages.length} Image{uploadedImages.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Detail View Component
  const DetailView = ({ collection }) => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800" onClick={handleBackToGallery}>
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">BACK TO GALLERY</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Heart size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Download size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Category Tag */}
          <div className="inline-block mb-4">
            <span className="text-purple-600 text-sm font-semibold tracking-wide uppercase">
              {collection.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-6xl font-serif font-semibold text-gray-900 leading-tight mb-6">
            {collection.title}
          </h1>
          {/* Description */}
          <p className="text-gray-600 text-[18px] font-light font-sans leading-relaxed max-w-full mb-8">
            {collection.description}
          </p>
          {/* Description2 */}
          <p className="text-gray-600 text-[18px] font-light font-sans leading-relaxed max-w-full mb-8">
            {collection.description2}
          </p>

          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-purple-600" />
              <span className="text-gray-700 text-[14px]">{collection.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Camera size={20} className="text-purple-600" />
              <span className="text-gray-700 text-[14px] ">{collection.photographer}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-purple-600" />
              <span className="text-gray-700 text-[14px]">{collection.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={20} className="text-purple-600" />
              <span className="text-gray-700 text-[14px]">{collection.guests}</span>
            </div>
             <div className="flex items-center gap-3">
                  <span className="text-gray-700 text-[14px] font-medium">Client:</span>
                  <span className="text-gray-700 text-[14px]">{collection.client}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 text-[14px] font-medium">Duration:</span>
                  <span className="text-gray-700 text-[14px]">{collection.duration}</span>
                </div>
                
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-2">Gallery</h2>
              <p className="text-gray-600">View all images from this collection</p>
            </div>
            <button
              onClick={() => setShowImageUploader(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Add Images
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collection.galleryImages?.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-75 transition-opacity cursor-pointer transform hover:scale-105 transition-transform duration-300"
                data-aos="zoom-in"
                data-aos-delay={`${index * 100}`}
                data-aos-duration="600"
                onClick={() => {
                  setSelectedImage(image)
                  setSelectedImageIndex(index)
                }}
              >
                <img
                  src={image || "/placeholder.svg?height=300&width=300"}
                  alt={`${collection.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Image Uploader Modal */}
          {showImageUploader && <ImageUploader />}
        </div>

        {/* Image Modal/Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              {selectedImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = selectedImageIndex - 1
                    setSelectedImageIndex(newIndex)
                    setSelectedImage(collection.galleryImages[newIndex])
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Button */}
              {selectedImageIndex < collection.galleryImages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = selectedImageIndex + 1
                    setSelectedImageIndex(newIndex)
                    setSelectedImage(collection.galleryImages[newIndex])
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Full size view"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {selectedImageIndex + 1} / {collection.galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // If a collection is selected, show detail view
  if (selectedCollection) {
    return <DetailView collection={selectedCollection} />
  }

  // Otherwise show gallery view
  return (
    <>
      {/* Gallery-1 */}
      <div className="min-h-[50vh] mt-[70px] bg-[#F8F8F8] px-4 sm:px-6 py-8">
        {/* Back to Home Link */}
        <div className="max-w-6xl mx-auto" data-aos="fade-up" data-aos-duration="2000">
          <div className="flex justify-center items-center mb-5">
          </div>

          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl  text-[#1A1A1A] mb-6 sm:mb-8 tracking-tight font-bold font-['serif'] font-light">
              GALLERY
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#666666] font-light leading-relaxed max-w-3xl font-sanc mx-auto">
              A curated collection of our finest moments, captured in timeless elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery-2 */}
      <div className="min-h-screen bg-[#F6F6F6] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation and Search */}
          <div className="w-full bg-light">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Navigation - Improved for mobile */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto" data-aos="fade-up" data-aos-duration="2000">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base transition-colors ${
                      activeCategory === category
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category} <span className="hidden sm:inline">({categoryCounts[category]})</span>
                  </button>
                ))}
              </div>

              {/* Search and View Controls - Improved responsiveness */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto mb-4 sm:mb-0"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                {/* Search Bar - Responsive width */}
                <div className="relative w-full sm:w-48 md:w-64 mb-12">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search collections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent w-full"
                  />
                </div>

                {/* View Mode Toggle - Better mobile spacing */}
                <div className="flex bg-white border mb-12 border-gray-200 rounded-lg self-start sm:self-auto hover:border-[#8A2BE2] border-[3px] rounded-lg ">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-l-lg ${
                      viewMode === "grid" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-r-lg ${
                      viewMode === "list" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6" data-aos="fade-up" data-aos-duration="2000">
            <p className="text-gray-600">
              Showing {filteredCollections.length} collection{filteredCollections.length !== 1 ? "s" : ""}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Collections Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredCollections.map((collection, index) => {
                // Calculate animation delay based on position
                const animationDelay = `${(index % 3) * 150 + Math.floor(index / 3) * 100}ms`

                return (
                  <div
                    key={collection.id}
                    className="overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    data-aos="fade-up"
                    data-aos-delay={animationDelay}
                    data-aos-duration="800"
                    data-aos-easing="ease-out-cubic"
                    onClick={() => handleCollectionClick(collection)}
                  >
                    <div className="relative group">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.title}
                        className="w-full h-[40vh] object-cover group-hover:opacity-75 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-4"
                      data-aos="fade-up"
                      data-aos-delay={`${Number.parseInt(animationDelay) + 200}ms`}
                      data-aos-duration="600"
                    >
                      <h3 className="text-lg font-sans text-gray-900 hover:text-[#8A2BE2] mb-2 transition-colors duration-300">
                        {collection.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <Calendar className="w-4 h-4 mr-2 text-[#0056E3]" />
                        {collection.date}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-[#008080]" />
                        {collection.location}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // List view with enhanced animations
            <div className="space-y-4">
              {filteredCollections.map((collection, index) => (
                <div
                  key={collection.id}
                  className="bg-white h-auto md:h-[46vh] shadow-md p-4 md:p-6 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                  data-aos="slide-up"
                  data-aos-delay={`${index * 150}`}
                  data-aos-duration="800"
                  data-aos-easing="ease-out-cubic"
                  onClick={() => handleCollectionClick(collection)}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
                      <div className="relative group overflow-hidden rounded-lg">
                        <img
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          className="w-full md:w-[381px] h-auto md:h-[286px] object-cover transition-transform duration-500 group-hover:scale-110"
                          data-aos="fade-right"
                          data-aos-delay={`${index * 150 + 200}`}
                          data-aos-duration="600"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                      </div>
                      <div className="w-full">
                        <h3
                          className="text-2xl md:text-[36px] font-gray-500 mb-2 md:mb-4 font-serif hover:text-[#8A2BE2] transition-colors duration-300"
                          data-aos="fade-up"
                          data-aos-delay={`${index * 150 + 100}`}
                          data-aos-duration="600"
                        >
                          {collection.title}
                        </h3>
                        <div
                          className="flex flex-col sm:flex-row sm:items-center text-[14px] md:text-[16px] text-gray-600 space-y-2 sm:space-y-0 sm:space-x-4 mt-1 mb-4"
                          data-aos="fade-up"
                          data-aos-delay={`${index * 150 + 250}`}
                          data-aos-duration="600"
                        >
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {collection.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {collection.location}
                          </div>
                        </div>
                        <button
                          className="flex items-center text-[#8A2BE2] text-[14px] hover:text-gray-800 transition-colors duration-300 mt-1 group"
                          style={{ border: "none" }}
                          data-aos="fade-up"
                          data-aos-delay={`${index * 150 + 300}`}
                          data-aos-duration="600"
                        >
                          View Collection
                          <svg
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
              <p className="text-gray-600">
                {searchTerm
                  ? `No collections match "${searchTerm}". Try a different search term.`
                  : "No collections available in this category."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PhotoPortfolio