import apiSlice from "./ApiSlice"

export const bannerApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addBanner:builder.mutation({
            query:(newBanner)=>({
                url:'/banner/create',
                method:'POST',
                body:newBanner
            }),
            invalidatesTags:['Banner']
        }),
        getBanner:builder.query({
            query:()=>'/banner/all',
            providesTags:['Banner']
        }),
        deleteBanner:builder.mutation({
            query:(id)=>({
                url:`/banner/delete/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Banner']
        }),
        updateBanner:builder.mutation({
            query:(id)=>({
                url:`/banner/edit/${id}`,
                method:'PUT',
                body:data.banner
            }),
            invalidatesTags:['Banner']
        })

    })
})

export const {useAddBannerMutation,useGetBannerQuery}=bannerApi;