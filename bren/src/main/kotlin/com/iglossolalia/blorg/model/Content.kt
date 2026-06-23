package com.iglossolalia.blorg.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Content(
    @Id
    var id: String? = null,
    @Column(nullable = false)
    var content: String,
)
