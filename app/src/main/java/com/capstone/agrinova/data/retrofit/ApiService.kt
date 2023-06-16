package com.capstone.agrinova.data.retrofit

import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @GET("detail/{id}")
    fun getAgrinova(
        @Path("id") id: String
    ): Call<AgrinovaResponse>
}