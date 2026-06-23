package com.iglossolalia.blorg.model

import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.Id
import kotlin.time.Instant

@Entity
class BlogEntry (
    @Id
    var id: String? = null,
    @Column(nullable = false)
    var title: String,
    @Column(nullable = false)
    var timestamp: Instant,
    var description: String? = null,
    var author: String? = null,
    var headerImage: String? = null,
    @ElementCollection
    var keywords: List<String>,
)
