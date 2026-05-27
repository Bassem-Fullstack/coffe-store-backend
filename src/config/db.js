


const mongoose = require("mongoose")

let cached = global.mongoose // بقولوة شوف كدة في نودي جيس حاجة متخزنة عندك في جليوبيل اسمها مونجوس

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectDB = async () => {
  if (cached.conn) return cached.conn // هو كدة خزن اتصال بتاعة في كاشينج عشان لما تيجي تسجل دخول ع صفحة ميقعدش يعمل اتصال كل شواية بمونجو ديبي احنا هنا خزن الاتصال في كاشينج يعني بقولوة متفتحتش اتصال تاني بالمونجو ديبي طالما هو في اتصال متخزن في كاشينج

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URL) // لو مفيش اتصال بمونجو ديبي افتحلي اتصال على طول مع مونجو ديبي ونتصل بة
  }

  cached.conn = await cached.promise // استنا لما اتصال يخلص وبعد كدة خزنهولي في كاشينج بتاع نودي جيس سيرفر جلويبل عام

  return cached.conn // لو فية اتصال ارجعلي بنتيجة اتصال
}

module.exports = connectDB