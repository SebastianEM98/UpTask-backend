import colors from "colors"
import app from "./server"

const port = process.env.PORT || 4000

// http request listening
app.listen(port, () => {
    console.log(colors.cyan.bold(`######## Server running on port: ${port} ########`))
})