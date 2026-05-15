

const ProductSchema = require("../validations/JoiProducts")


const validateProduct = (req , res , next) => {

const {error} = ProductSchema.validate(req.body)

if(error){

return res.status(400).send(error.details[0].message)

}

next()

}

module.exports = validateProduct


// .validate() بعد ما عملت قواعد بتاعتك مكتبة جوي بيديك فونشين تتعامل مع القيمة عشان يتعامل مع ايرور بدري وجوة فالديت فونشين دي خاصية اسمها ايرورر

// .validate() افحص الداتا دي باستخدام القواعد اللي في الـ schema”

// فالديت فونشين بترجع اوبجكيت فية ايرورر وفاليو احنا عايزين فاليو دة بقي
// {
//   value: ...,   // البيانات بعد الفحص
//   error: ...    // لو في خطأ
// }

// {error} الفكرة انا بستدعيها من فونشين لانها جوة اوبجيكيت داخل فونشين وبعد كدة خلاص هتتخزن على اساس انها متغير فهقدر استخدمها لوحدها 





