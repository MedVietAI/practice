'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Users, Star, Flag, Clock, Trophy, Camera } from 'lucide-react'
import { historicalContent } from '@/lib/content'

export default function CelebrationSection() {
  const [selectedEvent, setSelectedEvent] = useState(0)
  const celebration = historicalContent.celebrations[0]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-red-800 mb-4">
          Kỷ Niệm 80 Năm Quốc Khánh
        </h2>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto">
          Cùng nhau tôn vinh những thành tựu vĩ đại của dân tộc Việt Nam qua 80 năm độc lập, tự do
        </p>
      </motion.div>

      {/* Main Celebration Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 text-white mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">Năm {celebration.year}</h3>
            <h4 className="text-xl mb-6">{celebration.theme}</h4>
            <p className="text-lg opacity-90 mb-6">
              Một năm đặc biệt với nhiều hoạt động ý nghĩa để tôn vinh lịch sử hào hùng của dân tộc
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>2/9/2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Toàn quốc</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Flag className="w-16 h-16" />
            </motion.div>
            <p className="text-lg font-semibold">80 Năm Độc Lập</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-600" />
            Hoạt Động Chính
          </h3>
          <div className="space-y-3">
            {celebration.activities.slice(0, 6).map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{activity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-600" />
            Địa Điểm Tổ Chức
          </h3>
          <div className="space-y-3">
            {celebration.locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{location}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-green-600" />
            Sự Kiện Đặc Biệt
          </h3>
          <div className="space-y-4">
            {celebration.specialEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{event.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <p className="text-sm text-gray-700">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-white rounded-xl shadow-lg p-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <Clock className="w-6 h-6 mr-2 text-red-600" />
          Dòng Thời Gian Sự Kiện
        </h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-yellow-500 rounded-full" />
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {celebration.specialEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center space-x-6 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {/* Event Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 bg-gray-50 rounded-lg p-6 ${
                    selectedEvent === index ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                  onClick={() => setSelectedEvent(index)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{event.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Tham Gia Cùng Chúng Tôi
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Hãy cùng nhau tôn vinh lịch sử hào hùng của dân tộc và xây dựng tương lai tươi sáng cho đất nước
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Chia Sẻ Khoảnh Khắc</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Tìm Hiểu Thêm</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
