import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'jc9hi5en', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    apiVersion: 'v1',
    token: 'skae32ouh4jcYqrKuvqjIyK7HxnAdeXZrAXbPWIASM1LKxISnVkQ1D6wBBtwxahCixfpcFtR5XkSYSyZvVxceoNbXoY2VzyvCqYcUaovGTAQCL6382WNpA6rQ2ZIu5S3SrSfIsI6sipQ2hmfLHIbqWZjpoqnqpSy8cgXFR2nlrseQ0Tg7Brc',
    useCdn: false // `false` if you want to ensure fresh data
  })