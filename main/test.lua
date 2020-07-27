package.path = package.path .. ";?/init.lua"
local lemur = require("node_modules/lemur")
local TestEZ = require('node_modules/testez')



local habitat = lemur.Habitat.new()

local ReplicatedStorage = habitat.game:GetService("ReplicatedStorage")

local includeFolder = habitat:loadFromFs("include")
includeFolder.Name = "include"
includeFolder.Parent = ReplicatedStorage

print(includeFolder, ReplicatedStorage)


local out = habitat:loadFromFs("out")
out.Name = "out"
out.Parent = ReplicatedStorage

