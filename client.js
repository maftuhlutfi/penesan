import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '8dx4tpeh', // you can find this in sanity.json
  dataset: 'test', // or the name you chose in step 1
  apiVersion: 'v1',
  token: 'skv6SKTmKYHykdxQmTT7knS5YBdE7X2XnyaAviJYraX4J1qlIxW36RTeC4d481nQKusJKklee0Ueu5PbbNSEtjeGqxKaYSPE8cyAl4FvyTwtL8sFv7yu2IoMBn895VAgZ3dQDM94bpd0WbGy7QqqCfimJ8hqoo0SfL5zw3ww7BWkWXsSvo3E',
  useCdn: false // `false` if you want to ensure fresh data
})