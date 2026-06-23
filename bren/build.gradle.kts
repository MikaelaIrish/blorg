plugins {
    kotlin("jvm") version "2.3.10"
    kotlin("plugin.jpa") version "2.4.0"
    application
}

group = "org.iglossolalia"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()

}

application {
    mainClass.set("org.iglossolalia.bren.Application")
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("org.springframework.boot:spring-boot-starter-web:4.1.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:4.1.0")
    implementation("com.h2database:h2:2.4.240")
}

kotlin {
    jvmToolchain(25)
}

tasks.test {
    useJUnitPlatform()
}
