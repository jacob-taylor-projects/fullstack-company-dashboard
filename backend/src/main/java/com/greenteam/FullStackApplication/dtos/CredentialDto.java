package com.greenteam.FullStackApplication.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CredentialDto {
    private String username;

    private String password;
}
