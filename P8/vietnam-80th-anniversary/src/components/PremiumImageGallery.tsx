'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar, Tag, Eye, Download, Share2, Search, Filter, Grid, List, Heart, Star, ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import NewsImageFetcher, { NewsImage } from '@/lib/news-image-fetcher'

interface PremiumImageGalleryProps {
  category?: string
  title?: string
  showFilters?: boolean
}

export default function PremiumImageGallery({ 
  category, 
  title = "Hình Ảnh Lịch Sử Việt Nam",
  showFilters = true 
}: PremiumImageGalleryProps) {
  const [images, setImages] = useState<NewsImage[]>([])
  const [filteredImages, setFilteredImages] = useState<NewsImage[]>([])
  const [selectedImage, setSelectedImage] = useState<NewsImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'source'>('date')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = [
    { id: 'all', name: 'Tất cả', color: 'from-gray-500 to-gray-600', count: 0 },
    { id: 'celebration', name: 'Lễ kỷ niệm', color: 'from-red-500 to-red-600', count: 0 },
    { id: 'exhibition', name: 'Triển lãm', color: 'from-blue-500 to-blue-600', count: 0 },
    { id: 'culture', name: 'Văn hóa', color: 'from-green-500 to-green-600', count: 0 },
    { id: 'education', name: 'Giáo dục', color: 'from-yellow-500 to-orange-600', count: 0 },
    { id: 'historical', name: 'Lịch sử', color: 'from-purple-500 to-purple-600', count: 0 }
  ]

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    filterImages()
  }, [images, selectedCategory, searchTerm, sortBy])

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const [celebrationImages, historicalImages] = await Promise.all([
        NewsImageFetcher.fetchCelebrationImages(),
        NewsImageFetcher.fetchHistoricalImages()
      ])
      
      const allImages = [...celebrationImages, ...historicalImages]
      setImages(allImages)
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = images

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'source':
          return a.source.localeCompare(b.source)
        default:
          return 0
      }
    })

    setFilteredImages(filtered)
  }

  const toggleFavorite = (imageId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId)
      } else {
        newFavorites.add(imageId)
      }
      return newFavorites
    })
  }

  const openImageModal = (image: NewsImage) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex])
    }
  }

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
      setSelectedImage(filteredImages[prevIndex])
    }
  }

  // Update category counts
  useEffect(() => {
    const counts = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? images.length : images.filter(img => img.category === cat.id).length
    }))
    // Update categories with counts
  }, [images])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ★
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl border-b-2 border-red-200 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mb-4">
                {title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá những hình ảnh lịch sử quý giá từ các nguồn tin chính thống
              </p>
            </motion.div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm hình ảnh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                />
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'source')}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
                >
                  <option value="date">Sắp xếp theo ngày</option>
                  <option value="title">Sắp xếp theo tên</option>
                  <option value="source">Sắp xếp theo nguồn</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      {cat.name}
                      {cat.count > 0 && (
                        <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                          {cat.count}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-6 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
              />
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6 text-center">
                <p className="text-lg text-gray-600">
                  Hiển thị {filteredImages.length} hình ảnh
                  {selectedCategory !== 'all' && ` trong danh mục "${categories.find(c => c.id === selectedCategory)?.name}"`}
                </p>
              </div>

              {/* Image Grid/List */}
              <motion.div
                layout
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                <AnimatePresence>
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`group cursor-pointer ${
                        viewMode === 'grid' ? 'bg-white rounded-2xl shadow-xl overflow-hidden' : 'bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4'
                      }`}
                      onClick={() => openImageModal(image)}
                    >
                      {viewMode === 'grid' ? (
                        <>
                          {/* Grid View */}
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(image.id)
                                }}
                                className={`p-2 rounded-full ${
                                  favorites.has(image.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${favorites.has(image.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="font-bold text-sm mb-1 line-clamp-2">{image.title}</h3>
                              <p className="text-xs text-gray-200 line-clamp-1">{image.description}</p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {image.source}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(image.date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                              {image.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {image.description}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* List View */}
                          <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {image.source}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">
                                  {new Date(image.date).toLocaleDateString('vi-VN')}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(image.id)
                                  }}
                                  className={`p-1 rounded ${
                                    favorites.has(image.id) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  <Heart className={`w-3 h-3 ${favorites.has(image.id) ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                              {image.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {image.description}
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredImages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy hình ảnh</h3>
                  <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeImageModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image */}
                <div className="aspect-video">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {selectedImage.source}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(selectedImage.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedImage.id)}
                      className={`p-2 rounded-full ${
                        favorites.has(selectedImage.id) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(selectedImage.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedImage.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedImage.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Tải xuống</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Chia sẻ</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Xem nguồn</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
