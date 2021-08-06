import client from "../../../client";

export default function handler(req, res) {
    client
  .delete({query: '*[_type == "contribution"][0...999]'})
  .then(res.send('ok'))
  .catch(console.error)
}