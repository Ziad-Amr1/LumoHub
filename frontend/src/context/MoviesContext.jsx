// src/context/MoviesContext.jsx
import { createContext, useContext, useEffect, useState, useRef } from "react"
import moviesData from "../data/moviesData.jsx"

const MoviesContext = createContext()

export function MoviesProvider({ children }) {
  // 🎬 الأساسيات
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  // 🧭 العرض والفرز
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [gridCols, setGridCols] = useState(6)

  // 📑 التصفح
  const [page, setPage] = useState(1)
  const [moviesPerPage, setMoviesPerPage] = useState(12)

  // 🔍 الفلاتر
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedGenres: [],
    selectedYear: "",
    selectedRating: "",
  })

  // 🆕 الفيلم المختار
  const [selectedMovie, setSelectedMovie] = useState(null)

  // 🔗 مرجع للفلاتر (scroll عند الفتح)
  const searchRef = useRef(null)

  // 📦 تحميل البيانات (مرة واحدة فقط)
  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      // ✅ إزالة التكرارات بناءً على id قبل التخزين
      const uniqueMovies = Array.from(
        new Map(moviesData.map((m) => [m.id, m])).values()
      )

      setMovies(uniqueMovies)
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  // 🔍 الفلترة
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = filters.searchQuery
      ? movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      : true

    const matchesGenre = filters.selectedGenres?.length
        ? movie.genres?.some((g) =>
        filters.selectedGenres.includes(g.toLowerCase())
    )
      : true

    const matchesYear = filters.selectedYear
      ? movie.releaseDate?.startsWith(filters.selectedYear)
      : true

    const matchesRating = filters.selectedRating
      ? (movie.rating || 0) >= parseFloat(filters.selectedRating)
      : true

    return matchesSearch && matchesGenre && matchesYear && matchesRating
  })

  // 🧮 الفرز
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    let result = 0
    switch (sortBy) {
      case "title":
        result = a.title.localeCompare(b.title)
        break
      case "year":
        result =
          parseInt(b.releaseDate?.split("-")[0] || "0", 10) -
          parseInt(a.releaseDate?.split("-")[0] || "0", 10)
        break
      case "rating":
        result = (b.rating || 0) - (a.rating || 0)
        break
      default:
        result = 0
    }

    return sortOrder === "asc" ? result : -result
  })

  // 📄 التصفح
  const totalPages = Math.max(1, Math.ceil(sortedMovies.length / moviesPerPage))
  const startIndex = (page - 1) * moviesPerPage
  const endIndex = startIndex + moviesPerPage
  const paginatedMovies = sortedMovies.slice(startIndex, endIndex)

  // 🧱 تبديل الأعمدة
    const cycleGridCols = () => {
    setGridCols((prev) => {
        let next
        if (prev === 6) next = 4
        else if (prev === 4) next = 5
        else next = 6

        // 🔁 تحديث عدد الأفلام حسب الأعمدة
        if (next === 5) setMoviesPerPage(15)
        else setMoviesPerPage(12)

        return next
    })
    }

  // 📍 تمرير للفلاتر
  const handleOpenFilters = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // 🔄 رجوع للصفحة الأولى عند تقليل عدد النتائج
  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [totalPages, page])

  // 🎯 اختيار فيلم بالتفاصيل
  const selectMovieById = (id) => {
    const found = movies.find((m) => String(m.id) === String(id))
    setSelectedMovie(found || null)
  }

  // 🧠 تأكيد عدم وجود تكرار بعد أي تحديث
  useEffect(() => {
    const ids = new Set()
    const duplicates = movies.filter((m) => {
      if (ids.has(m.id)) return true
      ids.add(m.id)
      return false
    })
    if (duplicates.length > 0) {
      console.warn("🚨 Duplicate movies detected and removed:", duplicates)
      setMovies((prev) => {
        const map = new Map()
        prev.forEach((m) => map.set(m.id, m))
        return Array.from(map.values())
      })
    }
  }, [movies])

  // 📦 تصدير كل القيم
  const value = {
    movies,
    loading,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    gridCols,
    cycleGridCols,
    page,
    setPage,
    totalPages,
    moviesPerPage,
    filters,
    setFilters,
    paginatedMovies,
    filteredMovies,
    selectedMovie,
    setSelectedMovie,
    selectMovieById,
    handleOpenFilters,
    searchRef,
  }

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
}

export function useMoviesContext() {
  return useContext(MoviesContext)
}
