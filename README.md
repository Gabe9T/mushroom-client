# Setup Instructions

* To enable token authentication, in the API Server project, create appsettings.json in the project directory and add the following code:

```

{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*",
    "ConnectionStrings": {
        "DefaultConnection": "Server=localhost;Port=3306;database=mushrooms;uid=root;pwd=epicodus;"
    },
    "JWT": {
        "ValidAudience": "example-audience",
        "ValidIssuer": "example-issuer",
        "Secret": "SecretPassword12"
    }
}

```

* To enable CORS, In Program.cs, enter the following code:

```

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowOrigin",
      builder => builder.WithOrigins("http://localhost:3000") // Add the origin of your React application
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

```

this code should be directly above the following line

```

var app = builder.Build();

```

* Then, add the following line

```

app.UseCors("AllowOrigin");

```

directly above the following lines

```

app.UseAuthentication();
app.UseAuthorization();

```


# OBJECTIVES FOR THURSDAY

* Edit functionality (PUT request)
* Styling
* README