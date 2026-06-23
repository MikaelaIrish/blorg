package com.iglossolalia.blorg.model

import jakarta.persistence.*

@Entity
class Image(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    @Column(nullable = false)
    var entry: String = "",
    var title: String = "",
    var altText: String = "",
    var width: Int = 0,
    var height: Int = 0,
    @Lob
    var image: ByteArray = byteArrayOf(),
)
