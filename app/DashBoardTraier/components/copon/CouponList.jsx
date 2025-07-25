"use client";
import { useState, useEffect } from 'react';
import { getCoupons } from '../../../../services/couponData';
import qs from 'qs';
import { FaSearch, FaCopy, FaTag, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CouponList = ({ courseDocumentId }) => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      try {
        const couponsData = await getCoupons(courseDocumentId);
        setCoupons(couponsData);
        setFilteredCoupons(couponsData);
      } catch (error) {
        console.error('فشل جلب الكوبونات:', error);
        setCoupons([]);
        setFilteredCoupons([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseDocumentId) {
      fetchCoupons();
    }
  }, [courseDocumentId]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter(coupon =>
        coupon?.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoupons(filtered);
    }
  }, [searchTerm, coupons]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('تم نسخ الكود', {
      icon: '📋',
      style: {
        background: '#f0fdf4',
        color: '#166534',
        border: '1px solid #bbf7d0'
      }
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن كوبون..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">جاري تحميل الكوبونات...</p>
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTag className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد كوبونات</h3>
          <p className="text-gray-600">
            {searchTerm ? 'لم يتم العثور على كوبونات مطابقة للبحث' : 'لم يتم إنشاء أي كوبونات لهذه الدورة بعد'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رمز الكوبون
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخصم
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الانتهاء
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نسخ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-mono">
                        {coupon.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {coupon.discount}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                    {new Date(coupon.expiresAt).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => handleCopy(coupon.code)}
                      className="text-gray-400 hover:text-blue-500 p-2 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <FaCopy />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {filteredCoupons.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          عرض {filteredCoupons.length} من {coupons.length} كوبون
        </div>
      )}
    </div>
  );
};

export default CouponList;