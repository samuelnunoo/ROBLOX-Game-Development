package.path = package.path .. ";?/init.lua"
local lemur = require("lemur")

local habitat = lemur.Habitat.new()

local ReplicatedStorage = habitat.game:GetService("ReplicatedStorage")

local includeFolder = habitat:loadFromFs("include")
includeFolder.Name = "include"
includeFolder.Parent = ReplicatedStorage

pcall(function()
local moduleFolder = habitat:loadFromFs("include/node_modules")
moduleFolder.Name = "node_modules"
moduleFolder.Parent = includeFolder
end)

local out = habitat:loadFromFs("out")
out.Name = "out"
out.Parent = ReplicatedStorage

habitat:require(out.main)