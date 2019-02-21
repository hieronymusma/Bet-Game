using System;
using System.Net;
using System.Net.Sockets;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.DataStorage;
using Server.Services;

namespace Server
{
    public class Startup
    {
        private const int ANGULAR_PORT = 4200;

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Database=BetGame;Trusted_Connection=True;MultipleActiveResultSets=true");
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins($"http://localhost:{ANGULAR_PORT}", 
                                 $"http://{Environment.MachineName}:{ANGULAR_PORT}", 
                                 $"http://{GetLocalIpAddress()}:{ANGULAR_PORT}",
                                 $"http://0.0.0.0:{ANGULAR_PORT}");
            }));

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });

            services.AddScoped<IDataService, DataService>();
            services.AddScoped<IGuidService, GuidService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseSignalR(routes =>
            {
                routes.MapHub<BetHub.BetHub>("/BetHub");
            });
        }

        private string GetLocalIpAddress()
        {
            string localIP;
            using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
            {
                socket.Connect("8.8.8.8", 65530);
                IPEndPoint endPoint = socket.LocalEndPoint as IPEndPoint;
                localIP = endPoint.Address.ToString();
            }
            return localIP;
        }
    }
}
