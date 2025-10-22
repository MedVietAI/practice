'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Calendar, Tag, Eye, Download, Share2 } from 'lucide-react'
import NewsImageFetcher, { NewsImage } from '@/lib/news-image-fetcher'

interface NewsImageGalleryProps {
  category?: string
  title?: string
  showFilters?: boolean
}

export default function NewsImageGallery({ 
  category, 
  title = "Hình Ảnh Từ Nguồn Tin Chính Thống",
  showFilters = true 
}: NewsImageGalleryProps) {
  const [images, setImages] = useState<NewsImage[]>([])
  const [filteredImages, setFilteredImages] = useState<NewsImage[]>([])
  const [selectedImage, setSelectedImage] = useState<NewsImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'Tất cả', color: 'gray' },
    { id: 'celebration', name: 'Lễ kỷ niệm', color: 'red' },
    { id: 'exhibition', name: 'Triển lãm', color: 'blue' },
    { id: 'culture', name: 'Văn hóa', color: 'green' },
    { id: 'education', name: 'Giáo dục', color: 'yellow' },
    { id: 'historical', name: 'Lịch sử', color: 'purple' }
  ]

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    filterImages()
  }, [images, selectedCategory, searchTerm])

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const [celebrationImages, historicalImages] = await Promise.all([
        NewsImageFetcher.fetchCelebrationImages(),
        NewsImageFetcher.fetchHistoricalImages()
      ])
      
      setImages([...celebrationImages, ...historicalImages])
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = images

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredImages(filtered)
  }

  const openImageModal = (image: NewsImage) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const shareImage = async (image: NewsImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: image.url
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(image.url)
      alert('Đã sao chép liên kết vào clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
        />
        <span className="ml-4 text-lg text-gray-600">Đang tải hình ảnh...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-red-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Hình ảnh chính thống từ các nguồn tin uy tín: Đảng Cộng sản, Chính phủ, và VTV
        </p>
      </motion.div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? `bg-${cat.color}-500 text-white`
                      : `bg-${cat.color}-100 text-${cat.color}-700 hover:bg-${cat.color}-200`
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Tìm kiếm hình ảnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Hiển thị {filteredImages.length} / {images.length} hình ảnh
          </div>
        </motion.div>
      )}

      {/* Image Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => openImageModal(image)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-red-300 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for broken images - use patriotic SVG
                    e.currentTarget.src = `data:image/svg+xml;base64,${Buffer.from(`
                      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="400" height="300" fill="url(#grad)"/>
                        <text x="200" y="140" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Hình Ảnh Lịch Sử</text>
                        <text x="200" y="170" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">80 Năm Quốc Khánh</text>
                        <text x="200" y="200" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">Việt Nam Tự Hào</text>
                      </svg>
                    `).toString('base64')}`
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                    image.category === 'celebration' ? 'bg-red-500' :
                    image.category === 'exhibition' ? 'bg-blue-500' :
                    image.category === 'culture' ? 'bg-green-500' :
                    image.category === 'education' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}>
                    {categories.find(cat => cat.id === image.category)?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {image.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(image.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{NewsImageFetcher.getSourceInfo(image.source).name}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div 
              className="bg-black bg-opacity-75 absolute inset-0"
              onClick={closeImageModal}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden relative z-10 mx-4"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">{selectedImage.title}</h3>
                  <button
                    onClick={closeImageModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mt-2">{selectedImage.description}</p>
              </div>

              {/* Modal Image */}
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full max-h-96 object-cover"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedImage.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{NewsImageFetcher.getSourceInfo(selectedImage.source).name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareImage(selectedImage)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Chia sẻ</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(selectedImage.url, '_blank')}
                      className="flex items-center space-x-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Xem gốc</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
