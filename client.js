import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'jc9hi5en', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    apiVersion: 'v1',
    useCdn: true // `false` if you want to ensure fresh data
  })