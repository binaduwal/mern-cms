import apiSlice from "./ApiSlice"

export const bannerApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addBanner:builder.mutation({
            query:(formData)=>({ 
                url:'/api/banner/create',
                method:'POST',
                body:formData
            }),
            invalidatesTags:['Banner']
        }),
        getBanner:builder.query({
            query:()=>'/api/banner/all',
            providesTags:['Banner']
        }),
        getBannerById: builder.query({
            query: (id) => `/api/banner/${id}`, 
            providesTags: (result, error, id) => [{ type: 'Banner', id }],
        }),
        deleteBanner:builder.mutation({
            query:(id)=>({ 
                url:`/api/banner/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Banner']
        }),
        updateBanner:builder.mutation({
            query:({ id, formData })=>({ 
                url:`/api/banner/edit/${id}`,
                method:'PUT',
                body:formData
            }),
            invalidatesTags:['Banner']
        })
    })
})

export const {
    useAddBannerMutation,
    useGetBannerQuery,
    useGetBannerByIdQuery, // Export the new hook
    useDeleteBannerMutation, // Export this hook
    useUpdateBannerMutation  // Export this hook
}=bannerApi;